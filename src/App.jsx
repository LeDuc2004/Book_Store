import { Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import Signin from "./components/authen/Signin";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/authen" element={<Signin></Signin>} />
 


      </Routes>
    </>
  );
}

export default App;
