import { Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./Pages/Home"
import Jobpost from "./Pages/Jobpost"
import Setting from "./Pages/Setting";
import Message from "./Pages/Message";
import Landing from "./Pages/Landing";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index  element={<Landing/>}/>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/job-board" element={<Jobpost />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/messages" element={<Message />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
