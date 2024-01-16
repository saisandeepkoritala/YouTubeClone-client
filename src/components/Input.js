import React from 'react'
import "../styles/Input.css";
import { CiSearch } from "react-icons/ci";
import {changeSearchTerm,setData,setsearchHistory,setdataToken} 
from "./store";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Input = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchTerm = useSelector((store)=>store.user.searchTerm)

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(searchTerm){
            // post request 
            dispatch(setsearchHistory(searchTerm))
            axios.post(`${process.env.REACT_APP_PRODUCTION }/getData`,{
                searchTerm
            })
            .then((resp)=>{
                // console.log(resp.data.data)
                const {detail} = resp.data.data
                if(detail){
                    notify()
                    console.log("sorry bro")
                }
                else{
                    const token = resp?.data?.data?.continuation_token
                    dispatch(setdataToken(token))
                    dispatch(setData(resp?.data?.data?.videos))
                    navigate("/search")
                }
                }
            )
            .catch((e)=>{
                console.log("error")
                notify()
            })
            // console.log(resp?.data?.data?.videos)
        }
        else{
            console.log("outer")
            // let user know no input
            notify1()
        }
    }
    const notify=()=>{
        console.log("running")
        toast.info("Sorry no results !!", {
            progressStyle: { background: "red" },
            theme: 'colored',
            style: { background: "black", color: "red" },
        });
    }

    const notify1=()=>{
        toast.info("Provide SearchTerm !!", {
            progressStyle: { background: "red" },
            theme: 'colored',
            style: { background: "black", color: "red" },
        });
    }

    const handleChangeInput =(e)=>{
        dispatch(changeSearchTerm(e.target.value));
    }

    return (
    <>
    <ToastContainer />
    <form onSubmit={handleSubmit}>
        <input placeholder='Search here...' value={searchTerm} onChange={handleChangeInput}/>
        <CiSearch color='white' className='icon' onClick={handleSubmit}/>
        </form>
    </>
    )
}

export default Input