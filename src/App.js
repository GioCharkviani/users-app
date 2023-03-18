import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import './App.css';

import Users from './components/Users';
import User from './components/User';

const router = createBrowserRouter([
  {path: '/', element: <Users />},
  {path: 'user/:userId', element: <User />}
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
