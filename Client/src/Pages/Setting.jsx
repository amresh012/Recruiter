import React, { useState } from 'react'
import { IoAdd, IoNotificationsOutline } from 'react-icons/io5';
import Model from "../Components/Model"
// company name & logo
// profile -  linkedin & website
// contact - email & phone number
// social media - linkedin, twitter, instagram, facebook, youtube
// comp location
// comp description
// role of job poster in company & his social media
// company size & type
// company industry
// company founded year
// company revenue
// company address
// hiring process (optionl)
// make company profile card preview to show candidates
// department in company
// company culture
// company values
// photo of company
// 

const Setting = () => {
  const [account, setAccount] = useState({
    name:"",
    workemail: "",
    company_name: "",
    desination: "",
    password: "",
    mobile:""
  })
  const [openmodel, setOpenModel] = useState(false);
  const openModal = () => setOpenModel(true);
    const closeModal = () => setOpenModel(false);

  const formfield = [
    {
      label: "name",
      type: "text",
      id: "name",
      placeholder: "enter your name",
    },
    {
      label: "Work email",
      type: "email",
      id: "workemail",
      placeholder: "enter your email",
    },
    {
      label: "company name",
      type: "text",
      id: "company_name",
      placeholder: "enter your company name",
    },
    {
      label: "desination",
      type: "text",
      id: "desination",
      placeholder: "enter your desination",
    },
    {
      label: "password",
      type: "password",
      id: "password",
      placeholder: "enter your password",
    },
    {
      label: "mobile",
      type: "number",
      id: "mobile",
      placeholder: "enter your mobile",
    },
  ];



  return (
    <>
      <Model isOpen={openmodel} onClose={closeModal}></Model>
      <div className="w-full h-screen grid grid-cols-2 gap-2">
        <div className="left-box w-full h-screen p-6 space-y-4">
          <h1 className="text-xl font-bold uppercase">Account Setting</h1>
          <div className="">
            <form action="" className="grid grid-cols-2 gap-2">
              {formfield.map((field, index) => (
                <div key={index} className="flex flex-col ">
                  <label
                    className="uppercase mb-2 text-gray-700 font-medium"
                    htmlFor=""
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    className="border-b p-2 border-gray-600 outline-0"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
              <div className="flex items-center justify-center gap-2">
                <button
                  type="submit"
                  className="w-full p-2 rounded-lg border uppercase bg-indigo-600 hover:bg-indigo-500 duration-500 cursor-pointer text-white "
                >
                  Save
                </button>
                <button
                  type="reset"
                  className="w-full p-2 rounded-lg border uppercase bg-black text-white cursor-pointer hover:bg-black/80"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
          <div className="mt-[5%]">
            <h1 className="text-xl font-bold uppercase">
              Notification Setting
            </h1>
            <div className="flex flex-col items-center justify-center">
              <IoNotificationsOutline size={30} />
              <h1>No setting availiable</h1>
            </div>
          </div>
        </div>
        <div className="right-box w-full h-screen p-6 space-y-4">
          <div className="">
            <h1 className="text-xl font-bold uppercase">
              Social account Setting
            </h1>
            <div className="flex flex-col items-center justify-center mt-46 cursor-pointer">
              <div className="bg-gray-300 p-4 rounded-full " onClick={openModal}>
                <IoAdd size={30} />
              </div>
              <h1>No Social media connected</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting