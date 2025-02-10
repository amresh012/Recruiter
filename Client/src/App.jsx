import { Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./Pages/Home"
import Jobpost from "./Pages/Jobpost"
import Setting from "./Pages/Setting";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/job-board" element={<Jobpost />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
