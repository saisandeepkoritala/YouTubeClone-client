import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { FaHistory ,FaBars} from "react-icons/fa";

import Home from "./components/Home";
import Account from "./components/Account";
import History from "./components/History";
import Detail from "./components/Detail";
import Input from "./components/Input";
import Search  from "./components/Search";
import Footer from "./components/Footer";
import Login from "./Auth/login";
import Signup from "./Auth/signup";

import "react-toastify/dist/ReactToastify.css";
import { useSelector} from "react-redux";


function App() {
  const {isUser} = useSelector((store)=>store.user)
  return (
  <BrowserRouter> 
      {isUser && <div className="navbar">
        <Link><FaBars /></Link>
        <Link to="/home" ><div className="Wrap"><FaYoutube color="red" size={30}/><h1>YouTube</h1></div></Link>
        <Input />
        <Link to="/history" ><FaHistory /></Link>
        <Link to="/account" ><VscAccount /></Link>
      </div>}
      <div className="routes">
        <Routes>
          <Route element={<Login />} path="/"/>
          <Route element={<Signup />} path="/signup"/>
          <Route element={<Home />} path="/home"/>
          <Route element={<History />} path="/history"/>
          <Route element={<Search />} path="/search"/>
          <Route element={<Account />} path="/account"/>
          <Route element={<Detail />} path="/detail/:id"/>
        </Routes>
      </div>
      <div className="footer-card">
        <Footer/>
      </div>
  </BrowserRouter>
)}

export default App;