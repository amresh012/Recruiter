import React, { useEffect, useState } from 'react'
import { BiMailSend } from 'react-icons/bi';
import { FaCheck, FaPhone } from 'react-icons/fa';
import { SiHandshakeProtocol } from "react-icons/si";
import { landingPageMenu } from '../Constant';
import { Link } from 'react-router-dom';
import Menu from '../Components/UI/menu';
import { SiZomato } from "react-icons/si";
import { BiLogoVisa } from "react-icons/bi";
import { BiLogoTwitch } from "react-icons/bi";
import { BiLogoEbay } from "react-icons/bi";
import { BiLogoPaypal } from "react-icons/bi";
import { BiLogoStripe } from "react-icons/bi";
import Model from "../Components/Model"
import TextInput from '../Components/UI/Input';
import {code} from "../Constant"
import { Toaster, toast } from "react-hot-toast"
import axios from "axios";
import {base_url} from "../utils/base_url"
const Landing = () => {
  const [openmodel, setOpenModel] = useState(false);
  const [countrycode, setCountryCode] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: 0,
    company: "",
  });

   const handleChange = (e) => {
     setFormData({
       ...formData,
       [e.target.id]: e.target.value,
     });
  };
  console.log(formData)



  const client = [
    {
      id: 0,
      name: "Visa",
      icon: <BiLogoVisa />,
    },
    {
      id: 1,
      name: "Paypal",
      icon: <BiLogoPaypal />,
    },
    {
      id: 2,
      name: "Stripe",
      icon: <BiLogoStripe />,
    },
    {
      id: 3,
      name: "Zomato",
      icon: <SiZomato />,
    },
    {
      id: 4,
      name: "Twitch",
      icon: <BiLogoTwitch />,
    },
    {
      id: 5,
      name: "Ebay",
      icon: <BiLogoEbay />,
    },
  ];

  const diff = [
    {
      id: 0,
      title: "Fastest Hiring Solution in Industry.",
    },
    {
      id: 1,
      title: "Hire as fast as in 24 hours.",
    },
    {
      id: 2,
      title: "90% Automation with AI & LLMs.",
    },
    {
      id: 3,
      title: "Least Human Intervention Required.",
    },
    {
      id: 3,
      title: "Hire From Most Refined Pool of Talents.",
    },
  ];
   const openModal = () => setOpenModel(true);
   const closeModal = () => setOpenModel(false);

  const handlSubmit = (e) => {
    e.preventDefault()
    const SubmitInquery = async() => {
      try{
        const re = await axios.post(`${base_url}/inquery`, formData);
        console.log(re)
    }
    catch (error) {
      console.log(error)
    }
    }
    SubmitInquery()
  }


  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Model isOpen={openmodel} onClose={closeModal}>
        <div className="text-center py-4 text-xl font-bold">
          <h1>Make Your Hiring Automated & Fast</h1>
        </div>
        <form method="post" onSubmit={handlSubmit}>
          <TextInput
            label="Name"
            type="text"
            id="name"
            onChange={handleChange}
            placeholder="Enter your name"
          />
          <TextInput
            label="Email"
            type="email"
            id="email"
            onChange={handleChange}
            placeholder="Enter email"
          />
          <TextInput
            label="Company Name"
            type="text"
            id="company"
            onChange={handleChange}
            placeholder="Enter Company Name"
          />
          <div className="flex w-full items-center justify-between py-3 gap-2">
            <div className="flex flex-col max-w-[9rem]">
              <label htmlFor="">Country code *</label>
              <select
                onChange={handleChange}
                onClick={(e) => setCountryCode(e.target.value.slice(0, 4))}
                className="p-2 border border-gray-300 rounded-lg focus:outline-2 outline-blue-500"
              >
                {code.map((c, i) => (
                  <option key={i}>
                    {c.dial_code} {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full ">
              <label htmlFor="number">Mobile Number</label>
              <div className="flex items-center border border-gray-300 rounded-lg active:border-2 active:border-blue-500 overflow-clip">
                <span className="p-1">{countrycode}</span>
                <input
                  type="number"
                  id="number"
                  name="number"
                  onChange={handleChange}
                  className=" h-10 outline-0 w-full p-2"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 cursor-pointer text-white font-bold capitalize p-2 my-2 rounded-lg active:scale-95 duration-300"
          >
            Schedule your Demo
          </button>
        </form>
      </Model>
      <header className="bg-slate-900 relative  flex   justify-center">
        <div className="bg-white shadow-2xl text-xs  absolute h-[3rem] p-2 flex items-center gap-2 -top-2  rounded-bl-2xl rounded-br-2xl">
          <p>
            How Hire Fast transformed hiring for India's leading staffing firm!
          </p>
          <button className="p-3 bg-blue-950 text-white m-1  rounded-bl-2xl rounded-br-2xl">
            Read more
          </button>
        </div>
        <div className="flex w-full justify-between items-center p-3">
          <div className="flex items-center text-white gap-2 ">
            <BiMailSend />
            <p>contact@hirefast.com</p>
          </div>
          <div className="contact-number flex items-center text-white gap-2 ">
            <FaPhone />
            <p> +91 1234567890</p>
          </div>
        </div>
      </header>
      <nav className="bg-slate-950 flex items-center justify-between px-6">
        <div className="logo text-center text-white leading-0 p-2">
          <h1 className="text-xl font-bold uppercase flex">
            Hire
            <SiHandshakeProtocol />
            Fast
          </h1>
          <span className="text-xs">AI Driven Hiring Solution</span>
        </div>
        {/* link */}
        <ul className="flex items-center justify-between gap-10">
          {landingPageMenu.map((menu) => (
            <div className="text-white" key={menu.id}>
              {menu.name === "Solutions" ||
              menu.name === "Resource" ||
              menu.name === "Login" ? (
                <Menu title={menu.name} />
              ) : (
                <Link to={menu.url}>
                  <li>{menu.name}</li>
                </Link>
              )}
            </div>
          ))}
        </ul>
        <button
          onClick={openModal}
          type="button"
          className="px-6 cursor-pointer py-2 font-medium rounded-lg  uppercase text-[12px] bg-white text-blue-950"
        >
          Ready to hire
        </button>
      </nav>
      {/* body */}
      <main className="bg-gradient-to-br from-black to-blue-950 p-4">
        {/* hero */}
        <section className=" flex items-center justify-around  text-white relative">
          {/* <div className="w-[30rem] h-[30rem] rounded-full bg-blue-900 blur-[90px] absolute top-0  -left-24"></div> */}
          <div className="w-full flex flex-col items-start gap-2  justify-center  p-5">
            <p className="">
              Hire Professionals & Talentes faster with HireFast
            </p>
            <h1 className="text-[3rem] leading-14 font-extrabold">
              AI Driven Automated Hiring Solution Combining Human Experties &
              Insight.{" "}
            </h1>
            <p className="text-gray-200 font-medium text-[14px]">
              We at HireFast Innovating and Reimagined the Expensive Hiring
              Process by automating most of the repetable and tedious task cuts
              hiring time to 24-48 hours by combining AI-driven matching and
              domain expert assessments. HireFast offers real-time booking for
              specialists, AI-powered resume parsing, and transparent feedback
              loops to ensure fast, unbiased, and precise hiring.
            </p>
            <ul className="">
              {diff.map((d) => (
                <div className="flex items-center gap-2 text-[13px]" key={d.id}>
                  <span className="text-green-500">
                    <FaCheck />
                  </span>
                  <li className="font-medium">{d.title}</li>
                </div>
              ))}
            </ul>
            <div
              onClick={openModal}
              className="cta bg-gradient-to-l m-4  p-2 bg-blue-700  font-bold rounded-lg "
            >
              <button>Book Demo </button>
            </div>
            <div className="">
              <div className=""></div>
              <div className="">
                <img
                  src="https://incruiter.blob.core.windows.net/frontend/frontend-website/assets/g2_badges.png"
                  alt=""
                  className="h-20"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="p-4">
              <img
                src="https://incruiter.blob.core.windows.net/frontend/frontend-website/assets/all-products-carousel.png"
                alt=""
                className="h-[90vh]"
              />
            </div>
          </div>
        </section>
        {/* clients */}
        <section className="flex items-center justify-center my-4">
          <div className="w-[70vw] h-44 rounded-lg bg-white flex flex-col items-center justify-center gap-4">
            <h1 className="font-extrabold text-5xl text-gray-700 capitalize">
              We have amazing clients
            </h1>
            <div className="flex items-center justify-around gap-20 group">
              {client.map((c) => (
                <div
                  key={c.id}
                  className="w-full flex flex-col items-center cursor-pointer grayscale-100 group-hover-grayscale-0"
                >
                  <span className="text-6xl">{c.icon}</span>
                  <p className="uppercase font-bold text-xl">{c.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/*  */}
        {/* <section className='h-screen'>
          <div className="w-full">
            <h1>How HireFast Makeing Hiring Easy</h1>
          </div>
          <div className="">
            <div className="">
              <div className="w-[40rem] h-[40rem] bg-gradient-to-t from-blue-950 via-blue-800 to-blue-500 rounded-full blur-[5px]"></div>
            </div>
          </div>
        </section> */}
      </main>
    </>
  );
}

export default Landing