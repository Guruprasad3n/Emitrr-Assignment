import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Game from "./Components/Game";
import Rules from "./Components/Rules";
import Score from "./Components/Score";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route path="/game" element={<Game />} />
      </Routes>
      {/* <Score/> */}
    </div>
  );
}

export default App;
