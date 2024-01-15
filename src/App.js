import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { FaHistory ,FaBars} from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";



import Home from "./components/Home";
import Shorts from "./components/Shorts";
import History from "./components/History";
import Trending from "./components/Trending";
import Detail from "./components/Detail";
import Input from "./components/Input";
import  Search  from "./components/Search";

import Footer from "./components/Footer";



function App() {

  return (
  <BrowserRouter> 
      <div className="navbar">
        <Link to="/sidebar" ><FaBars /></Link>
        <Link to="/" ><div className="Wrap"><FaYoutube color="red" size={30}/><h1>
        YouTube</h1></div></Link>
        <Input />
        <Link to="/shorts" ><SiYoutubeshorts /></Link>
        <Link to="/history" ><FaHistory /></Link>
        <Link to="/trending" ><IoMdTrendingUp/></Link>
      </div>
      <div className="routes">
        <Routes>
          <Route element={<Home />} path="/"/>
          <Route element={<Shorts />} path="/shorts"/>
          <Route element={<History />} path="/history"/>
          <Route element={<Trending />} path="/trending"/>
          <Route element={<Search />} path="/search"/>
          <Route element={<Detail />} path="/detail/:id"/>
        </Routes>
      </div>
      <div className="footer-card">
        <Footer/>
      </div>
  </BrowserRouter>
)}

export default App;