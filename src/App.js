import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/home';
import NotFound from './pages/404';

function App() {
  const router = createBrowserRouter([
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/',
      element: <Home />,
    },
  ]);


  return (
    <div className="App ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
