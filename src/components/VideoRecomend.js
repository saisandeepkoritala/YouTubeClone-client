import React, { useEffect } from 'react';
import axios from "axios";
import { setvideoRecomend ,changeSelectedItem,setvideoRecomendToken} from './store';
import { useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../styles/recomend.css";


const VideoRecomend = (video_id) => {
    const navigate = useNavigate();
    const {videoRecomend} = useSelector((store)=>store.user)
    const dispatch = useDispatch();
    // console.log(videoRecomend)

    useEffect(()=>{

        const getData=async()=>{
            await new Promise(resolve => setTimeout(resolve, 2000));
            const resp = await axios.post(`${process.env.REACT_APP_PRODUCTION }/getVideoRecomend`,{
                video_id:video_id
            })
            //need to set continution token also 
            dispatch(setvideoRecomend(resp?.data?.data?.videos))
            // console.log(resp.data.data.videos)
        }
        getData();
    },[])
    const render = videoRecomend?.map((item,i)=>{
            if(i<=15){
                const src=item.thumbnails["1"].url
                return <div key={i} className='list'>
                <img src={src} alt="" onClick={()=>{
                dispatch(changeSelectedItem(item))
                navigate(`/detail/${item.video_id}`)
            }}/>
            </div>
            }
            else{
                return ""
            }
    })
    return (
    <div className='recomend'>{render}</div>
    )
}

export default VideoRecomend