import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Stack,
  StackDivider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axiosInstance from "../Services/axiosInstance";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Score() {
  const [bestScore, setBestScore] = useState([]);
  const { winGame } = useSelector((state) => state.game);
  // const dispatch = use
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
    fetchBestScores();
  }, [winGame]);

  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">
            <Center>Score Board</Center>
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                <Center> Top 10 Players</Center>
              </Heading>
              <Center>
                <TableContainer>
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Wins</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {bestScore &&
                        bestScore.map((e, index) => (
                          <Tr key={index}>
                            <Td>{e.username}</Td>
                            <Td>{e.points}</Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Center>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
export default Score;
