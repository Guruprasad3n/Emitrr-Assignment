import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startGame,
  drawCard,
  endGame,
  resetGame,
  winGame,
  updateWins,
} from "../redux/actions/gameActions";
import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import Rules from "./Rules";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Services/axiosInstance";
import Score from "./Score";

const Game = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bestScore, setBestScore] = useState([]);
  const { deck, gameInProgress, drawnCards, gameOver, winGame, wins } =
    useSelector((state) => state.game);

  const handleStartGame = () => {
    dispatch(startGame());
  };

  const handleDrawCard = () => {
    dispatch(drawCard());
  };

  const handleEndGame = () => {
    dispatch(endGame());
  };

  const handleResetGame = () => {
    dispatch(resetGame());
  };

  const handleWinGame = () => {
    dispatch(winGame());
    dispatch(updateWins());
  };

  const fetchBestScores = async () => {
    try {
      const response = await axiosInstance.get("/users/best-score");
      setBestScore(response.data.users);
      return response.data.user;
    } catch (error) {
      console.error("Error fetching best scores:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    fetchBestScores();
  }, [token]);
  return (
    <>
      <Flex justifyContent={"space-between"} m={5}>
        <Heading as="h2" mb="4">
          Exploding Kitten
        </Heading>
        <Rules />
      </Flex>
      <Flex alignItems={"center"} gap={40}>
        <Box p="4" width={"60%"}>
          {!gameInProgress && (
            <Center>
              <Button onClick={handleStartGame} colorScheme="blue" mb="4">
                Start Game
              </Button>
            </Center>
          )}
          {gameInProgress && !gameOver && (
            <Box mb="4">
              <Text fontSize="lg" mb="2">
                Deck:
              </Text>
              <Box margin={"auto"}>
                <Grid templateColumns="repeat(5, 1fr)" gap={2}>
                  {deck.map((card, index) => (
                    <GridItem key={index}>
                      <Box
                        bg="#fff"
                        p="2"
                        borderRadius="md"
                        textAlign="center"
                        boxShadow="md"
                        borderWidth="1px"
                        borderColor="gray.200"
                        maxW="150px"
                        minH="150px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text>{card.type}</Text>
                      </Box>
                    </GridItem>
                  ))}
                </Grid>
              </Box>
              <Center>
                <Button onClick={handleDrawCard} colorScheme="green" mt="4">
                  Draw Card
                </Button>
              </Center>
            </Box>
          )}

          {gameOver && (
            <Center>
              <Box mb="4">
                <Center>
                  {" "}
                  <Text fontSize="lg" mb="2">
                    Game Over
                  </Text>
                </Center>
                <Flex gap={2}>
                  <Button onClick={handleEndGame} colorScheme="red">
                    End Game
                  </Button>
                  <Button onClick={handleResetGame} colorScheme="blue" mb="4">
                    Restart Game
                  </Button>
                </Flex>
              </Box>
            </Center>
          )}

          {winGame && (
            <Center>
              <Box mb="4">
                <Text fontSize="lg" mb="2">
                  You Won the Match!
                </Text>
                <Flex gap={2}>
                  <Text>Wins: {wins}</Text>
                </Flex>
              </Box>
            </Center>
          )}

          <Center>
            <Flex direction={"column"}>
              <Center>
                <Text fontSize="lg" mb="2">
                  Drawn Cards:
                </Text>
              </Center>

              <Flex flexWrap="wrap">
                {drawnCards.map((card, index) => (
                  <Box
                    key={index}
                    bg="#fff"
                    p="2"
                    borderRadius="md"
                    textAlign="center"
                    m="1"
                    boxShadow="md"
                    borderWidth="1px"
                    borderColor="gray.200"
                    h="150px"
                    w="150px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text>{card.type}</Text>
                  </Box>
                ))}
              </Flex>
            </Flex>
          </Center>
        </Box>
        <Box w={400}>
          <Score />
        </Box>
      </Flex>
    </>
  );
};

export default Game;
