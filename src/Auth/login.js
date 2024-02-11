import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import {setisUser,setuserInfo} from "../components/store";
import ColoredCircle from '../components/ColoredCircle';
import {ToastContainer,toast} from "react-toastify";
import "./Login.css";
import axios from "axios";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputEmailRef = useRef();
    const [Color,SetColor]=useState("red");

    useEffect(() => {
        inputEmailRef.current.focus();
        axios.get(`${process.env.REACT_APP_PRODUCTION}/isAlive`)
        .then((res)=>{
            if(res.status===200){
                SetColor("green")
            }
        })
        .catch((err)=>console.log(err))
    }, []);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const notify=(msg)=>{
        toast.info(msg, {
            progressStyle: { background: "red" },
            theme: 'colored',
            style: { background: "black", color: "red" },
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const resp = await axios.post(`${process.env.REACT_APP_PRODUCTION}/login`,{
                email:formData.username,
                password:formData.password
            })
            // console.log(resp.data.data)
            if(resp.status===200){
                dispatch(setuserInfo(resp?.data?.data))
                dispatch(setisUser(true))
                navigate("/home")
            }
        }
        catch(e){
            console.log("error")
            notify("invalid details")
        }
        
    };

    return (
        <div className='login'>
            <ToastContainer />
            <h2 >Login</h2>
            <form onSubmit={handleSubmit}>
                <div >
                    <label>Email:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="johndoe@gmail.com"
                        ref={inputEmailRef}
                    />
                </div>

                <div >
                    <label >Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="password"
                    />
                </div>

                <button type="submit" >
                    Login
                </button>
            </form>

            <button
                type="submit"
                onClick={() => navigate("/signup")}
            >
                Sign Up
            </button>
            <ColoredCircle color={Color}/>
        </div>
    );
};



export default Login;
