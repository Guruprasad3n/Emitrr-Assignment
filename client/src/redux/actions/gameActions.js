import { updateUserWinsAndPoints } from "./userActions";

export const startGame = () => ({
  type: "START_GAME",
  payload: { deck: shuffledDeck() },
});

export const drawCard = (userId) => (dispatch, getState) => {
  const {
    game: { deck, defuseCard, wins },
  } = getState();

  const drawnCard = deck.pop();

  dispatch({ type: "DRAW_CARD", payload: { drawnCard } });
  if (drawnCard.type === "Exploding Kitten") {
    if (!defuseCard) {
      dispatch({ type: "END_GAME" });
      return;
    } else {
      dispatch({ type: "USE_DEFUSE_CARD" });
      dispatch({ type: "REMOVE_EXPLODING_KITTEN" });
      return;
    }
  } else if (drawnCard.type === "Shuffle") {
    dispatch({ type: "RESET_GAME" });
    dispatch(startGame());
  }
  if (deck.length === 0) {
    dispatch({ type: "WIN_GAME" });
    dispatch(updateWins());
    dispatch(updateUserWinsAndPoints(userId));
    return;
  }
  if (deck.length === 1 && deck[0].type === "Shuffle") {
    dispatch({ type: "WIN_GAME" });
    dispatch(updateWins());
    return;
  }
};

export const endGame = () => ({ type: "END_GAME" });

export const resetGame = () => ({ type: "RESET_GAME" });

export const winGame = () => ({ type: "WIN_GAME" });

export const updateWins = () => (dispatch, getState) => {
  const {
    game: { wins },
  } = getState();
  const updatedWins = wins + 1;
  dispatch({ type: "UPDATE_WINS", payload: { wins: updatedWins } });
};

export const updateLeaderboard = () => (dispatch, getState) => {
  const { user } = getState();
  const leaderboard = user
    ? [{ username: user.username, points: user.points }]
    : [];
  dispatch({ type: "UPDATE_LEADERBOARD", payload: { leaderboard } });
};
const shuffledDeck = () => {
  const deck = [
    { type: "Cat", id: 1 },
    { type: "Defuse", id: 2 },
    { type: "Shuffle", id: 3 },
    { type: "Exploding Kitten", id: 4 },
    { type: "Cat", id: 5 },
  ];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};
