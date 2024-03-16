const initialState = {
  deck: [],
  drawnCards: [],
  gameInProgress: false,
  gameOver: false,
  winGame: false,
  leaderboard: [],
  defuseCard: false,
  explodingKittenDrawn: false,
  wins: 0,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        deck: action.payload.deck,
        gameInProgress: true,
      };
    case "DRAW_CARD":
      const { drawnCard } = action.payload;

      let updatedDrawnCards = state.drawnCards;
      let updatedDeck = state.deck;

      if (drawnCard.type === "Exploding Kitten") {
        if (!state.defuseCard) {
          return {
            ...state,
            drawnCards: [...updatedDrawnCards, drawnCard],
            gameOver: true,
            explodingKittenDrawn: true,
          };
        } else {
          updatedDrawnCards = [...updatedDrawnCards, drawnCard];
          updatedDeck = updatedDeck.filter((card) => card.id !== drawnCard.id);
          return {
            ...state,
            drawnCards: updatedDrawnCards,
            deck: updatedDeck,
            defuseCard: false,
            explodingKittenDrawn: true,
          };
        }
      } else if (drawnCard.type === "Defuse") {
        updatedDrawnCards = [...updatedDrawnCards, drawnCard];
        updatedDeck = updatedDeck.filter((card) => card.id !== drawnCard.id);
        return {
          ...state,
          drawnCards: updatedDrawnCards,
          deck: updatedDeck,
          defuseCard: true,
        };
      } else if (drawnCard.type === "Shuffle") {
        return {
          ...initialState,
          deck: action.payload.newDeck,
          gameInProgress: true,
        };
      } else {
        updatedDrawnCards = [...updatedDrawnCards, drawnCard];
        updatedDeck = updatedDeck.filter((card) => card.id !== drawnCard.id);
        return {
          ...state,
          drawnCards: updatedDrawnCards,
          deck: updatedDeck,
        };
      }
    case "END_GAME":
      return {
        ...state,
        gameOver: true,
      };
    case "WIN_GAME":
      return {
        ...state,
        winGame: true,
      };
    case "UPDATE_WINS":
      return {
        ...state,
        wins: action.payload.wins,
      };
    case "RESET_GAME":
      return initialState;
    case "UPDATE_LEADERBOARD":
      return {
        ...state,
        leaderboard: action.payload.leaderboard,
      };
    default:
      return state;
  }
};

export default gameReducer;
