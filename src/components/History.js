import React from 'react'
import { useSelector } from 'react-redux'
import YouTubeVideo from "../YouTubeVideo";

const History = () => {
  const {searchHistory,watchHistory} = useSelector((store)=>store.user)
  console.log(searchHistory)
  console.log(watchHistory)

  const render1= searchHistory.map((item)=>{
    return <p>{item}</p>
  })

  const render2= watchHistory.map((item)=>{
    console.log(item)
    return <YouTubeVideo videoId={item} width={500} height={500}/>
  })

  return (
    <div>
      Search History:{render1}
      Watch History:{render2}
    </div>
  )
}

export default History