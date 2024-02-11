import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { changeSelectedItem, setData,setwatchHistory} from "./store";
import "../styles/Home.css";
import axios from 'axios';

const Home=()=> {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Info = useSelector((store)=>store.user.data);

    useEffect(()=>{
        const getData=async()=>{
            const resp = await axios.get(`${process.env.REACT_APP_PRODUCTION }/getTrending`)
            // need to change 
            // console.log(resp?.data?.data?.videos)
            dispatch(setData(resp?.data?.data?.videos))
        }
        getData()

    },[dispatch])

    const render=Info?.map((item,i)=>{
            return (
                <div>
                <img src={item.thumbnails[1]?.url} alt="" key={item.title} 
                    onClick={()=>{
                        dispatch(changeSelectedItem(item))
                        dispatch(setwatchHistory(item.video_id))
                        navigate(`/detail/${item.video_id}`)
                }} 
                />
                <p>{item.title}</p>
                </div>
            
    )}
    )
    return <div className="home">{render}</div>
}

export default Home;
