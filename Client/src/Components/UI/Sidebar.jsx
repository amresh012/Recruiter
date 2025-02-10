import { useState } from "react";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";
import { menu } from "../../Constant";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import Badge from "@mui/material/Badge";
import { theme } from "../../theme/theme";
import { Avatar } from "@mui/material";
import {useLocation} from "react-router-dom"
const Sidebar = () => {

  const location= useLocation()

  const img =
    "";
  const name="My Name"
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const isOnline = true;

 
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
  return (
    <div
      className={`flex flex-col relative  ${
        isOpen ? "w-[20rem]" : "w-20"
      } h-screen bg-black text-white p-4 transition-width duration-300`}
    >
      <div className="parent flex items-center justify-around gap-2 p-2">
        {isOpen ? (
          <div className="flex items-center justify-evenly gap-3">
            <div className="relative">
              {img && img !== "" ? (
                <Avatar src={img} />
              ) : (
                <Avatar {...stringAvatar(name)} />
              )}
            </div>
            <div className="">
              <h1>Euler Nerdixcl</h1>
              <p className="font-light text-xs">Euler@email.com</p>
            </div>
            <div className="plan text-xs bg-red-200/20 text-red-500 rounded-lg p-2">
              <h1>Plan</h1>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <div className="relative">
              {img && img !== "" ? (
                <Avatar src={img} />
              ) : (
                <Avatar {...stringAvatar(name)} />
              )}
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="bg-gray-800 -right-3 hover:bg-gray-600 transition-colors duration-300 absolute top-2  rounded-full "
        >
          {isOpen ? (
            <LuArrowLeftToLine size={25} />
          ) : (
            <LuArrowRightToLine size={25} />
          )}
        </button>
      </div>
      {isOpen ? (
        <ul className="mt-4 space-y-2">
          {menu.map((item) => (
            <Link
              to={item.url}
              key={item.id}
              className={
                location.pathname === item.url
                  ? "flex gap-3 items-center bg-gray-100 p-2 duration-500 text-black group rounded-4xl"
                  : "flex gap-3 items-center hover:bg-gray-100 p-2 duration-500 hover:text-black group rounded-4xl"
              }
            >
              <item.icon
                size={25}
                className="group-hover:scale-105 duration-500"
              />
              <li className=" items-center uppercase text-gray-400">
                {item.name}
              </li>
              {item.name === "Notification" && (
                <Badge badgeContent={4} color="primary"></Badge>
              )}
              {item.name === "Messages" && (
                <Badge badgeContent={4} color="primary"></Badge>
              )}
              {item.name === "Tips" && (
                <div className="p-1 text-xs bg-red-200 text-red-500 absolute right-6 rounded-lg text-center">
                  <p>New</p>
                </div>
              )}
            </Link>
          ))}
        </ul>
      ) : (
        <div className="">
          {menu.map((item) => (
            <Link
              to={item.url}
              key={item.id}
              className={
                location.pathname === item.url
                  ? "flex relative gap-6 items-center bg-gray-100 p-3 duration-500 text-black group rounded-4xl"
                  : "flex relative gap-6 items-center hover:bg-gray-100 p-3 duration-500 hover:text-black group rounded-4xl"
              }
              // className="flex relative gap-6 items-center hover:bg-gray-100 p-3 duration-500 hover:text-black group rounded-4xl"
            >
              {item.name === "Notification" && (
                <div className=" absolute right-0 z-50 -top-1 rounded-full text-white text-center">
                  <Badge badgeContent={4} color="primary"></Badge>
                </div>
              )}
              <item.icon
                size={25}
                className="group-hover:scale-105 duration-500"
              />
              <div className="bg-black hidden group-hover:block w-28 text-center absolute -right-[7rem] p-3 text-white rounded-lg shadow-2xl">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="absolute bottom-0 w-full">
        <div className="p-4">
          {isOpen ? (
            <div className="flex items-center gap-3">
              <span>
                <IoIosLogOut size={25} />
              </span>
              <button className=" uppercase text-gray-400">Logout</button>
            </div>
          ) : (
            <div className="relative group cursor-pointer">
              <span>
                <IoIosLogOut size={25} />
                <div className="bg-black hidden -top-2 group-hover:block w-28 text-center absolute -right-[6rem] p-3 text-white rounded-lg shadow-2xl">
                  Logout
                </div>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
