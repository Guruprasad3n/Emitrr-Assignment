# Exploding Kitten

## Description

Brief description of the project.

## Table of Contents

<!-- - [Features](#features) -->
- [Technologies Used](#technologies-used)
- [Setup](#setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
<!-- - [Usage](#usage) -->
<!-- - [Contributing](#contributing)
- [License](#license) -->

<!-- ## Features

- Feature 1
- Feature 2
- ... -->

## Technologies Used

- Frontend:
  - React
  - Redux
  - axios
  - React Router
  - Chakra UI
- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT (JSON Web Tokens)
  - bcrypt
  - dotenv

## Setup

### Frontend Setup

1.  Clone the repository.

        git clone https://github.com/Guruprasad3n/Emitrr-Assignment.git

2.  Navigate to the `client` directory.

        cd Emitrr-Assignment/client

3.  Install dependencies: `npm install`.
4.  Start the development server: `npm run dev`.
5.  Access the application at `http://localhost:5173`.

### Backend Setup

1. Clone the repository.
2. Navigate to the `server` directory.
3. Install dependencies: `npm install`.
4. Create a `.env` file based on the `.env.example` template and configure environment variables.
5. Start the server: `npm start`.
6. The server will start running at the specified port (default: `http://localhost:8000`).

---

---

---

# Assignment - Question

👋 Welcome! The objective of this exercise is to build a web-based game.

This will be an online single-player card game that consists of 4 different types of cards

- Cat card 😼
- Defuse card 🙅‍♂️
- Shuffle card 🔀
- Exploding kitten card 💣

There will be a button to start the game. When the game is started there will be a deck of 5 cards ordered randomly. Each time user clicks on the deck a card is revealed and that card is removed from the deck. A player wins the game once he draws all 5 cards from the deck and there is no card left to draw.

Rules –

- If the card drawn from the deck is a cat card, then the card is removed from the deck.
- If the card is exploding kitten (bomb) then the player loses the game.
- If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.
- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.

Now create a **react** app using redux which allows a player to draw a random card from the deck once the game is started.

Allow users to create a username to enter the game and create a leaderboard to record how many games they won

You need to use **Redis** as a database to store the points of all the users and **Golang** for the backend. One game won is equal to one point.

**Bonus -**

1. Automatically save the game for a user at every stage so the user can continue from where he left off last time.
2. Real-time update of points on the leaderboard for all the users if they are playing simultaneously.

**Solution set**
**Your solution set needs to be hosted somewhere** and a tar.gz file containing all your code and a README with setup and run instructions. Please also state any other assumptions you make
