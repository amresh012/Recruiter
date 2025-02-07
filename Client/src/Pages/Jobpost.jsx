import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/base_url";
import moment from "moment"
import Model from "../Components/Model"
import TextInput from "../Components/UI/Input";
const Jobpost = () => {
  const [openmodel, setOpenModel] = useState(false);
  const [jobpost, setJobpost] = useState({});
  const [posted, setPosted] = useState([])
  const [isloading, setIsLoading] = useState(false);
  
  const handleadd = () => {
    setOpenModel(!openmodel)
  }
    const openModal = () => setOpenModel(true);
    const closeModal = () => setOpenModel(false);

  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  

  // job fetch

     const fetchjob = async () => {
       try {
         setIsLoading(true)
         const re = await axios.get(`${base_url}/job`);
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
  useEffect(() => {
      fetchjob()
  }, [])
  
  const handleSubmit = (e) => {
e.preventDefault();    
  }

  if (isloading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Model isOpen={openmodel} onClose={closeModal}>
        <div className="">
          <div className="">
            <h1>Create Job Post</h1>
          </div>
          <form onSubmit={handleSubmit} className="flex  flex-col gap-2">
            <TextInput
              label="Title"
              type="text"
              placeholder="Enter Job title"
              onChange={handleChange}
            />
            <TextInput
              label="description"
              type="text"
              placeholder="Enter Job description"
              onChange={handleChange}
            />
            <TextInput
              label="company"
              type="text"
              placeholder="Enter company Name"
              onChange={handleChange}
            />
            <TextInput
              label="location"
              type="text"
              placeholder="Enter Job location"
              onChange={handleChange}
            />
            <TextInput
              label="salary"
              type="number"
              placeholder="Enter salary"
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-2">
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
      <div className=" w-full px-4 py-4 space-y-4 ">
        <div className="p-4 rounded-lg  flex justify-between items-center bg-black static">
          <h1 className="uppercase font-bold text-3xl text-white">Job Board</h1>
          <div className="button bg-gradient-to-l from-blue-500 via-blue-600 to-blue-700 p-3 rounded-lg text-white cursor-pointer">
            <button onClick={openModal} type="button">
              Add New Job
            </button>
          </div>
        </div>
        {/* filters */}
        <div className="filter w-full border-2 rounded-lg min-h-[8vh]">
            {/* sort by recent , date, newst , oldest , most applicant, role , experiance, salary, Search,voice, */}
        </div>
        <div className="h-full w-full  rounded-lg">
          {posted && posted.length > 0 ? (
            <div className="grid grid-cols-4 gap-4 overflow-y-scroll">
              {posted.map((job) => (
                <div className="border-2 rounded-md p-2" key={job._id}>
                  <p>{job._id}</p>
                  <p>{moment(job.datePosted).format("LL")}</p>
                  <h1 className="text-2xl font-bold">{job.title}</h1>
                  <p>{job.description}</p>
                  <p>{job.location}</p>
                  <p>{job.role}</p>
                  <p>{job.experiance[0]}</p>
                  <p>{job.salary.toFixed(2)}</p>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      onClick={() => handledelete(job._id)}
                      className="bg-gray-400 p-2 w-full rounded-lg"
                    >
                      Delete
                    </button>
                    <button className="bg-black p-2 w-full rounded-lg text-white">
                      Edit
                    </button>
                    <button className="bg-indigo-600 text-white p-2 w-full rounded-lg">
                      Repost
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <h1 className="font-bold text-3xl">No Jobs Posted</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Jobpost;
