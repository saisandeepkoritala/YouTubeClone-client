import { useEffect, useState } from 'react';
import YouTubeVideo from "../YouTubeVideo";
import {useParams} from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { setwatchHistory ,setchannelData,setvideoDetails, setvideoComments,setvideoCommentsToken} from './store';
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike,AiOutlineDislike } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";
import Comments from "./Comments";
import axios from "axios";
import "../styles/Detail.css";
import VideoRecomend from './VideoRecomend';

const Detail = () => {

  const dispatch = useDispatch();
  const {selectedItem,channelData,videoDetails} = useSelector((store)=>store.user);
  const {channel_id} = selectedItem;
  const [width,Setwidth]=useState(560);
  const [height,Setheight]=useState(300);
  const item = useParams()

  useEffect(()=>{
    const getData = async () => {
      try {

        const respVideoDetails = await axios.post("http://localhost:5000/getVideoDetails", {
          video_id: item.id,
        });
        dispatch(setvideoDetails(respVideoDetails?.data?.data));
        const channel_id = respVideoDetails?.data?.data?.channel_id;
        // console.log(respVideoDetails?.data?.data)
        // Introduce another delay of 1000 milliseconds
        await new Promise(resolve => setTimeout(resolve, 2000));

        const respChannel = await axios.post("http://localhost:5000/channel", {
          channel_id: channel_id,
        });
        dispatch(setchannelData(respChannel?.data?.data));
    
        // Introduce a delay of 1000 milliseconds (1 second)
        await new Promise(resolve => setTimeout(resolve, 2000));
    
        const respComments = await axios.post("http://localhost:5000/getComments",{
          video_id: item.id
        });
        dispatch(setvideoCommentsToken(respComments?.data?.data?.continuation_token));
        dispatch(setvideoComments(respComments?.data?.data?.comments));


      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors here
      }
    };
    
    getData();
    
      const handleResize=()=>{
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        Setwidth(containerWidth)
        Setheight(containerHeight)
        }

        handleResize()
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
  },[item.id,dispatch,channel_id])

  // console.log("video details",videoDetails)
  let renderInfo="";
  let renderFooter="";
  let renderDetails="";


  if(selectedItem && channelData && videoDetails){
    // console.log("selected item",selectedItem)
    // console.log("channel data",channelData)
    let src="";
    if(channelData?.avatar){
      src=channelData?.avatar[0]?.url;
    }
    renderInfo=<div className='channel-info'>
        <div className='channel-title'>
          <p>{selectedItem.title}</p>
        </div>
        <div className='channel-desc'>
            <img src={src} alt="" />
            <div>
              <p>{channelData.title}</p>
              <p>{channelData.subscriber_count}</p>
            </div>
            <button>Join</button>
            <button>Subscribe</button>
            <button><AiOutlineLike size={24}/></button>
            <button><AiOutlineDislike size={24}/></button>
            <button><CiShare2 size={24}/></button>
            <button><BsThreeDots size={24}/></button>
        </div>
    </div>
    const dateString = `${videoDetails.published_time}`
    const options = { year: 'numeric', month: 'long',day: 'numeric'};
    const formattedDate = new Date(dateString).toLocaleString('en-US', options);

    const desp = selectedItem?.description?.split('•')
    renderFooter =<div className='channel-footer'>
      <p>{selectedItem.number_of_views.toLocaleString()} Views ,</p>
      <p>Uploaded on {formattedDate}</p>
      <div>{desp?.map((item,i)=>{
        return <p key={i}>{item}</p>
      })}</div>

    </div>

    renderDetails=<div className='channel-more'>
      <p>{videoDetails.description}</p>
      {videoDetails?.keywords?.map((item,i)=>{
        return <p key={i}>#{item}</p>
      })}
    </div>

  }

  return (
    <>
    <div className='detail'>
      <YouTubeVideo videoId={item.id} width={width} height={height}/>
      {renderInfo}
      {renderFooter}
      {renderDetails}
      <Comments video_id={item.id} />
    </div>
    <VideoRecomend video_id={item.id} />
    </>
    
  )
}

export default Detail