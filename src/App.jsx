import { Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import Signin from "./components/authen/Signin";
import Signup from "./components/authen/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/signin" element={<Signin></Signin>} />
        <Route path="/signup" element={<Signup></Signup>} />


      </Routes>
    </>
  );
}

export default App;
