import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";
import moment from "moment"
import Model from "../Components/Model"
import Button from "../Components/UI/button"
import TextInput from "../Components/UI/Input";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { BiRepost } from "react-icons/bi";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import { RiRobot3Line } from "react-icons/ri";



const Jobpost = () => {
  const [openmodel, setOpenModel] = useState(false);
  const [repost, setRepost] = useState([]);
  const [posted, setPosted] = useState([])
  const [isloading, setIsLoading] = useState(false);
  
  console.log("repo", repost);
    const openModal = () => setOpenModel(true);
    const closeModal = () => setOpenModel(false);

  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    role:"",
    salary: "",
    experience: "",
    skills:[],
    reposted: false,
    hiringtype:""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData)

  // job fetch

     const fetchjob = async (formData) => {
       try {
         setIsLoading(false)
         const re = formData
           ? await axios.post(`${base_url}/job`, formData)
           : await axios.get(`${base_url}/job`);
         console.log(re)
         setPosted(re.data);
         setIsLoading(false)
       } catch (error) {
         console.log(error);
       }
       finally {
         setIsLoading(false)
       }
  };
  
  // handle delete 
  const handledelete = async (id) => {
    try {
      const re = await axios.delete(`${base_url}/job/${id}`);
      console.log(re)
      fetchjob()
      
    } catch (error) {
      console.log(error);
    }
  }

  // repost job 
  const repostjob = async (id) => { 
    try {
      const re = await axios.post(`${base_url}/job/${id}/repost`);
      console.log(re)
      setRepost(re.data?.job)
      fetchjob()
    } catch (error) {
      console.log(error);
      }
  }
  useEffect(() => {
    fetchjob();
    repostjob()
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    fetchjob(formData)
    fetchjob()
  }

  if (isloading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Model isOpen={openmodel} onClose={closeModal}>
        <div className="">
          <div className="flex items-center gap-2 py-2 text-2xl uppercase">
            <h1>Post {formData.hiringtype} Job</h1>
            <Button text="Use AI" icon={<RiRobot3Line size={20} />} />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col gap-1 ">
                <label
                  htmlFor=""
                  className="mb-2 text-sm font-medium text-gray-700"
                >
                  Hiring Type
                </label>
                <select
                  className="outline-0 border p-2  uppercase rounded-lg"
                  id="hiringtype"
                  value={formData.hiringtype}
                  onChange={handleChange}
                >
                  <option value="Internship">Internship</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelancing">Freelancing</option>
                </select>
              </div>
              <TextInput
                label="Title"
                type="text"
                id="title"
                placeholder="Enter Job title"
                onChange={handleChange}
              />
              <TextInput
                label="description"
                type="text"
                id="description"
                placeholder="Enter Job description"
                onChange={handleChange}
              />
              <TextInput
                label="company"
                type="text"
                id="company"
                placeholder="Enter company Name"
                onChange={handleChange}
              />
              <TextInput
                label="Number of Position"
                type="number"
                id="positionCount"
                placeholder="Enter company Name"
                onChange={handleChange}
              />
              <TextInput
                label="role"
                type="text"
                id="role"
                placeholder="Enter company Name"
                onChange={handleChange}
              />
              <div className="">
                <TextInput
                  label="location"
                  type="text"
                  id="location"
                  className="w-full "
                  placeholder="Enter Job location"
                  onChange={handleChange}
                />
                <FormControlLabel
                  value="end"
                  control={<Checkbox />}
                  label="Only from this Region"
                  labelPlacement="Only from this Region"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {/* <div className="flex flex-col ">
                  <label
                    htmlFor=""
                    className="mb-2 text-sm font-medium text-gray-700"
                  >
                    Currency Type
                  </label>
                  <select
                    id="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="p-2 border border-gray-400 rounded-lg w-full outline-0"
                  >
                    <option value="">Currency</option>
                    <option value="Dollor">$</option>
                    <option value="rupee">₹</option>
                    <option value="Expert">€</option>
                  </select>
                </div> */}
                <TextInput
                  label="Minimum salary"
                  type="number"
                  id="salary"
                  placeholder="Enter min salary"
                  onChange={handleChange}
                />
                <TextInput
                  label="Maximum salary"
                  type="number"
                  id="salary"
                  placeholder="Enter max salary"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor=""
                  className=" text-gray-700 lowercase font-medium mb-2"
                >
                  Experiance
                </label>
                <select
                  id="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="p-2 border border-gray-400 rounded-lg"
                >
                  <option value="">Select Experiance</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>
            {/*  */}
            <div className="w-full flex flex-col">
              <div className="flex items-center gap-2 py-2 text-2xl uppercase">
                <h1>Other Compliances</h1>
              </div>
              <div className="grid grid-cols-3 h-96 gap-3">
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className=" text-gray-700 lowercase font-medium mb-2"
                  >
                    Office Type
                  </label>
                  <select
                    id="experience"
                    // value={formData.experience}
                    onChange={handleChange}
                    className="p-2 border border-gray-400 rounded-lg"
                  >
                    <option value="">Choose Office Type</option>
                    <option value="Remote">Remote</option>
                    <option value="In-Office">In-Office</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className=" text-gray-700 lowercase font-medium mb-2"
                  >
                    Year of Graduation
                  </label>
                  <select
                    id="experience"
                    // value={formData.experience}
                    onChange={handleChange}
                    className="p-2 border border-gray-400 rounded-lg"
                  >
                    <option value="">Choose Year of Graduation</option>
                    {[...Array(29)].map((_, i) => (
                      <option key={i} value={i}>{`20${i + 10}`}</option>
                    ))}
                  </select>
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Strict Preferance"
                    labelPlacement="Strict Preferance"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className=" text-gray-700 lowercase font-medium mb-2"
                  >
                    Minimum CGPA Preferences
                  </label>
                  <select
                    id="experience"
                    // value={formData.experience}
                    onChange={handleChange}
                    className="p-2 border border-gray-400 rounded-lg"
                  >
                    <option value="">Choose Minimum CGPA</option>
                    <option value="">6.0</option>
                    <option value="">6.5</option>
                    <option value="">7.0</option>
                    <option value="">7.5</option>
                    <option value="">8.0</option>
                    <option value="">8.5</option>
                    <option value="">9.0</option>
                    <option value="">9.5</option>
                    <option value="">10</option>
                  </select>
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Strict Preferance"
                    labelPlacement="Strict Preferance"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 w-fit">
              <button
                type="submit"
                className="bg-indigo-600 text-white font-bold capitalize p-2 my-2 rounded-lg active:scale-95 duration-300"
              >
                submit
              </button>
              <button
                type="reset"
                className="bg-gray-400 text-white font-bold capitalize p-2 my-2 rounded-lg active:scale-95 duration-300"
              >
                reset
              </button>
            </div>
          </form>
        </div>
      </Model>
      <div className="w-full px-4 py-4 space-y-4 ">
        <div className="p-4 rounded-lg  flex justify-between items-center static">
          <div className="button bg-gradient-to-l from-[#6A61F8] via-[#6A61F8]/80 to-[#6A61F8]/70 p-3 rounded-lg  cursor-pointer">
            <button onClick={openModal} type="button" className="text-white">
              Add New Job
            </button>
          </div>
        </div>
        <div className="h-full w-full  rounded-lg">
          {posted && posted.length > 0 ? (
            <div className="grid grid-cols-4 gap-4 ">
              {posted.map((job) => (
                <div className="border-2 rounded-md p-2" key={job._id}>
                  {/* <p>{moment(job.datePosted).format("LL")}</p> */}
                  <h1 className="text-2xl font-bold">{job.title}</h1>
                  <p className="break-words">{job.description}</p>
                  <p>{job.location}</p>
                  <p>{job.role}</p>
                  <p>{job.experiance}</p>
                  <p>{job.salary}LPA</p>
                  <div className="grid grid-cols-3 place-content-center text-center p-3 rounded-lg text-white font-extrabold cursor-pointer">
                    <button
                      onClick={() => handledelete(job._id)}
                      className="bg-red-500 w-full p-2 "
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                    <button className="bg-black w-full p-2 ">
                      <CiEdit size={20} />
                    </button>
                    <button
                      onClick={() => repostjob(job._id)}
                      className="bg-[#6A61F8] p-2 w-full "
                    >
                      <BiRepost size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center flex-col justify-self-start h-full w-full">
              <img
                src="/public/undraw_ideas-flow_8d3x.png"
                alt=""
                className="h-96"
              />
              <h1 className="font-bold text-3xl">No Jobs Posted</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Jobpost;
