import React from 'react'
import { useSelector } from 'react-redux'
import YouTubeVideo from "../YouTubeVideo";
import "../styles/History.css";

const History = () => {
  const {searchHistory,watchHistory} = useSelector((store)=>store.user)
  const newwatchHistory = [...new Set(watchHistory)];
  const render1= searchHistory.map((item)=>{
    return <p>{item}</p>
  })

  const render2= newwatchHistory.map((item)=>{
    // console.log(item)
    return <YouTubeVideo videoId={item} width={300} height={300}/>
  })

  return (
    <div className='history'>
      <h1>Search History:</h1>
      <div>{render1}</div>
      <h1>Watch History:</h1>
      <div>{render2}</div>
    </div>
  )
}

export default History