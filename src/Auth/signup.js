import { useState,useEffect,useRef} from 'react';
import { useNavigate } from 'react-router-dom'; 
import {useDispatch} from "react-redux"
import { setisUser } from '../components/store';
import axios from "axios";
import './SignupForm.css';
import {ToastContainer,toast} from "react-toastify";


function Signup() {

    const dispatch = useDispatch();
    useEffect(()=>{
        Ref.current.focus();
    },[])

    const Ref=useRef();
    const navigate = useNavigate();

    const[vanish,Setvanish]=useState(true);
    const[showVerify,SetshowVerify]=useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const notify=(msg)=>{
        toast.info(msg, {
            progressStyle: { background: "red" },
            theme: 'colored',
            style: { background: "black", color: "red" },
        });
    }

    const notify1=(msg)=>{
        toast.info(msg, {
            progressStyle: { background: "green" },
            theme: 'colored',
            style: { background: "black", color: "green" },
        });
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const [code,Setcode]=useState("");



    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(formData)
        const response = await axios.post(`${process.env.REACT_APP_PRODUCTION}/signup`,formData)

        if(!response.data.error){
            notify1("Successful SignUp !!")
            dispatch(setisUser(true));
            navigate("/home");
            }
            else{
                notify("Error,sign up again")
            }
    };

    const handleSubmitCode=async(e)=>{
        e.preventDefault();
        if(formData.name && formData.email){
            try{
                const resp= await axios.post(`${process.env.REACT_APP_PRODUCTION}/sendCode`,{
                    name:formData.name,
                    email:formData.email
                })
    
                console.log("broooooooooo",resp)
                if(resp.status===200){
                    SetshowVerify(true)
                    notify1("Please Check Your email !!");
                }
                else{
                    console.log("Error")
                    notify("Error,try again !!")
                }
            }
            catch(e){
                notify("Email already exists !!")
            }
        }
        else{
            notify('Fill Details !!')
        }
    }

    const handleCheckValid=async(e)=>{
        e.preventDefault();
        if(formData.email){
            try{
                const resp = await axios.post(`${process.env.REACT_APP_PRODUCTION}/verifyCode`,{
                    email:formData.email,
                    code:code
                })
    
                if(resp.status===200){
                    Setvanish(false)
                    SetshowVerify(false)
                    notify1("Verified !!")
                }
            }
            catch(e){
                    console.log("error")
                    notify("Invalid Code !!")
                }
            }
        else{
                // console.log("how bro ????")
                notify("Email Misiing !!")
        }
    }

    return (
        <>
        <ToastContainer />
        <div className="signup-form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className='fields'>
            <div>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder='john Doe'
                ref={Ref}
            />
            </div>
            <div>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='johndoe@gmail.com'
            />
            </div>

            {vanish &&<div className='vanish'>
                    <input
                        type="text"
                        name="code"
                        value={code}
                        onChange={(e)=>Setcode(e.target.value)}
                        placeholder='enter code...'
                    />
                <button type="submit" onClick={handleSubmitCode}>Send Code</button>
            </div>}
            {showVerify && <div className='vanishButton' onClick={handleCheckValid}>Verify</div>}

            {!vanish && <div>
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder='minimum length is eight'
            />
            </div>
            }
            {!vanish && <div>
            <label htmlFor="passwordConfirm">Confirm</label>
            <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder='confirm password'
            />
            </div>}
        {!vanish && <button type="submit">Sign Up</button>}
        </form>
        </div>
        </>
    );
}


export default Signup;
