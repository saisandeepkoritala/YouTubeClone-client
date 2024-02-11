import React from 'react'
import {useSelector} from "react-redux";

const Account = () => {

  const {userInfo} = useSelector((store)=>store.user);
  return (
    <div>
      <p>Name :{userInfo.user.name}</p>
      <p>Email :{userInfo.user.email}</p>
    </div>
  )
}

export default Account