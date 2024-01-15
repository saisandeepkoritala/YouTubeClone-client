import React from 'react'
import "../styles/Input.css";
import { CiSearch } from "react-icons/ci";
import {changeSearchTerm,setData,setsearchHistory} from "./store";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Input = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchTerm = useSelector((store)=>store.user.searchTerm)

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(searchTerm){
            // post request 
            // console.log(searchTerm)
            dispatch(setsearchHistory(searchTerm))
            const resp = await axios.post("http://localhost:5000/getData",{
                searchTerm
            })
            // console.log(resp?.data?.data?.videos)
            dispatch(setData(resp?.data?.data?.videos))
            navigate("/search")
        }
        else{
            // let user know no input
            
        }
    }

    const handleChangeInput =(e)=>{
        dispatch(changeSearchTerm(e.target.value));
    }

    return <form onSubmit={handleSubmit}>
        <input placeholder='Search here...' value={searchTerm} onChange={handleChangeInput}/>
        <CiSearch color='white' className='icon' onClick={handleSubmit}/>
        </form>
}

export default Input