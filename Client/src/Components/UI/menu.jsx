import React from 'react'
import "./menu.css"
const Menu = ({title,children}) => {
  return (
    <>
      <div className="navbar">
        <div className="dropdown">
          <button className="dropbtn">
            {title}
          </button>
          <div className="dropdown-content pb-4">
            <div className="header"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu