import React from 'react'
import "../styles/Comments.css";
import { useSelector,useDispatch } from 'react-redux';
import {setMore,setvideoCommentsToken} from "./store"
import axios from "axios";

const Comments = ({video_id}) => {
  const {videoComments,videoCommentsToken} = useSelector((store)=>store.user)

  const dispatch = useDispatch();
  // console.log("comments are",videoComments)
  // console.log("token ",videoCommentsToken)

  const handleClick=()=>{
    axios.post("http://localhost:5000/getCommentMore",{
      token:videoCommentsToken,video_id
    }).then((resp)=>{
      //need to update continuation token to new.
    // console.log("bro",resp.data.data.comments)
    dispatch(setMore(resp?.data?.data?.comments))
    dispatch(setvideoCommentsToken(resp?.data?.data?.continuation_token));
    })
    .catch((e)=>console.log("error",e))
    
  }

  const renderComments = videoComments?.map((item)=>{
    const src=item?.thumbnails[0]?.url
    return <div key={item.id}>
      <div>
          <img src={src} alt="" />
      </div>
      <div>
        <div>
          <p>{item.author_name}</p>
          <p>{item.published_time}</p>
        </div>
          <p>{item.text}</p>
      </div>
    </div>
  })
  return (
    <div className='comments'>
      <p>Comments:</p>
      {renderComments}
      <p onClick={()=>handleClick()}>Load More Comments</p>
      </div>
  )
}

export default Comments