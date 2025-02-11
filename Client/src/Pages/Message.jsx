import { Avatar, Chip, Divider } from "@mui/material";
import React from "react";

const Message = () => {
  return (
    <>
      <div className="w-full flex">
        <div className="chat-list w-[40vw] h-full border-l-2 border-black  bg-gray-200 p-2">
          <div className="flex flex-col items-center justify-center p-2 border-b border-black">
            <h1>Chats will be deleted after 90 days</h1>
            <div className="pill flex items-center justify-between p-2 w-full">
              {["Unread", "Read", "Recent", "Marked as seen", "Today"].map(
                (pil, i) => (
                  <Chip key={i} label={pil} />
                )
              )}
            </div>
          </div>
          <div className="space-y-4 h-[83vh] overflow-y-scroll">
            {[...Array(9)].map((li, i) => (
              <div className="flex border p-2" key={i}>
                <div className="">
                  <Avatar />
                </div>
                <div className="">
                  <div className="">
                    <p>User Name</p>
                    <div className="">
                      <button>View Profile</button>
                      <button>Ignore</button>
                            </div>
                            <div className="">
                                
                            </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-container w-full h-full"></div>
      </div>
    </>
  );
};

export default Message;
