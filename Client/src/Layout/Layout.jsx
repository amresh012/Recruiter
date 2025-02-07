import Sidebar from '../Components/UI/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex h-screen p-2 gap-6 mb-4">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Layout