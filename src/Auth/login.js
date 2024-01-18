import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import {setisUser} from "../components/store";
import ColoredCircle from '../components/ColoredCircle';
import "./Login.css";
import axios from "axios";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputEmailRef = useRef();
    const [Color,SetColor]=useState("red");

    useEffect(() => {
        inputEmailRef.current.focus();
        axios.get(`${process.env.REACT_APP_PRODUCTION}/`)
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await axios.post(`${process.env.REACT_APP_PRODUCTION}/login`,{
            email:formData.username,
            password:formData.password
        })
        console.log(resp)
        if(resp.status===200){
            dispatch(setisUser(true))
            navigate("/home")
        }
        else{
            console.log("error")
        }
    };

    return (
        <div className='login'>
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
                type="button"
                onClick={() => navigate("/signup")}
            >
                Sign Up
            </button>
            <ColoredCircle color={Color}/>
        </div>
    );
};



export default Login;
