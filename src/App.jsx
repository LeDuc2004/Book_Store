import { Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import Signin from "./components/authen/Signin";
import Pagecart from "./Page/Pagecart";
import PageAdmin from "./Page/PageAdmin";
import PageDetail from "./Page/PageDetail";


function App() {
  let arr = [
    { path: "/", element: <Home></Home> },
    { path: "/authen", element: <Signin></Signin> },
    { path: "/cart", element: <Pagecart></Pagecart> },
    { path: "/admin", element: <PageAdmin></PageAdmin> },
    { path: "/detail/:id", element:  <PageDetail></PageDetail>},


  ];
  return (
    <>
      <Routes>
        {arr.map((item , index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
