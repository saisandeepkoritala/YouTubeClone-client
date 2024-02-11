import React from 'react'
import "../styles/Comments.css";
import { useSelector,useDispatch } from 'react-redux';
import {setMore,setvideoCommentsToken} from "./store"
import axios from "axios";
import {ToastContainer,toast} from "react-toastify";

const Comments = ({video_id}) => {
  const {videoComments,videoCommentsToken} = useSelector((store)=>store.user)

  const dispatch = useDispatch();
  // console.log("comments are",videoComments)
  // console.log("token ",videoCommentsToken) 

  const handleClick=()=>{
    axios.post(`${process.env.REACT_APP_PRODUCTION }/getCommentMore`,{
      token:videoCommentsToken,video_id
    }).then((resp)=>{
      //need to update continuation token to new.
    // console.log("bro",resp.data.data.comments)
    dispatch(setMore(resp?.data?.data?.comments))
    dispatch(setvideoCommentsToken(resp?.data?.data?.continuation_token));
    })
    .catch((e)=>{console.log("error",e)
          notify()})
    }

  const notify=()=>{
    toast.info("Comments Loading Error", {
        progressStyle: { background: "red" },
        theme: 'colored',
        style: { background: "black", color: "red" },
    });
}

  const renderComments = videoComments?.map((item)=>{
    const src=item?.thumbnails[0]?.url 
    return <div key={item.id} className='list'>
      <div>
          <img src={src} alt="" />
      </div>
      <div>
        <div className='user'>
          <p>{item.author_name}</p>
          <p>Posted - {item.published_time}</p>
        </div>
          <p>{item.text}</p>
      </div>
    </div>
  })
  return (
    <div className='comments'>
      <h1>Comments:</h1>
      {renderComments}
      <p className="more" onClick={()=>handleClick()}>Load More Comments</p>
      <ToastContainer />
      </div>
  )
}

export default Comments