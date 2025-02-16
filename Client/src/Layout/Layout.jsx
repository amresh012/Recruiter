import Sidebar from '../Components/UI/Sidebar';
import { Outlet } from 'react-router-dom';
import Landing from '../Pages/Landing';

const Layout = () => {
  let token = false;
  if(!token) return <Landing/>
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Layout