import { Routes, Route } from 'react-router-dom';
import PageHome from './Page/PageHome';
import Signin from './components/authen/Signin';
import Pagecart from './Page/Pagecart';
import PageAdmin from './Page/PageAdmin';
import PageDetail from './Page/PageDetail';
import PageFavor from './Page/PageFavor';
import PageCatalg from './Page/PageCatalog';


function App() {
  let arr = [
    { path: '/', element: <PageHome></PageHome> },
    { path: '/authen', element: <Signin></Signin> },
    { path: '/cart', element: <Pagecart></Pagecart> },
    { path: '/admin', element: <PageAdmin></PageAdmin> },
    { path: '/detail/:id', element: <PageDetail></PageDetail> },
    { path: '/favorite', element: <PageFavor></PageFavor> },
    { path: '/catalog/:id', element: <PageCatalg></PageCatalg> },

  ];
  return (
    <>
      <Routes>
        {arr.map((item, index) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
