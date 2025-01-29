import { useState } from "react";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";
import { menu } from "../../Constant";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const isOnline = true;

  return (
    <div
      className={`flex flex-col relative rounded-lg  ${
        isOpen ? "w-[20rem]" : "w-20"
      } h-full bg-black text-white p-4 transition-width duration-300`}
    >
      <div className="parent flex items-center justify-around gap-2 p-2">
        {isOpen ? (
          <div className="flex items-center justify-evenly gap-3">
            <div className="bg-gray-700 border p-4 text-xl font-extrabold rounded-full text-center relative">
              <span>ED</span>
              {isOnline && (
                <span className="bg-green-400 w-3  shadow-2xl shadow-green-400 bottom-1 right-1  h-3 rounded-full absolute "></span>
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
            <div className="bg-gray-700 border p-4 text-xl font-extrabold text-white rounded-full text-center relative">
              <span>ED</span>
              {isOnline && (
                <span className="bg-green-400 w-3  shadow-2xl shadow-green-400 bottom-1 right-1  h-3 rounded-full absolute "></span>
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
              className="flex gap-3 items-center hover:bg-gray-100 p-2 duration-500 hover:text-black group rounded-4xl"
            >
              <item.icon
                size={25}
                className="group-hover:scale-105 duration-500"
              />
              <li className=" items-center uppercase text-gray-400">
                {item.name}
              </li>
              {item.name === "Notification" && (
                <div className="w-6 h-6 bg-red-500 absolute right-6 rounded-full text-white text-center">
                  <p>4</p>
                </div>
              )}
              {item.name === "Messages" && (
                <div className="w-6 h-6 bg-red-500 absolute right-6 rounded-full text-white text-center">
                  <p>0</p>
                </div>
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
              className="flex relative gap-6 items-center hover:bg-gray-100 p-3 duration-500 hover:text-black group rounded-4xl"
            >
              {item.name === "Notification" && (
                <div className="w-6 h-6 bg-red-500 absolute -right-2 z-50 -top-1 rounded-full text-white text-center">
                  <p>4</p>
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
