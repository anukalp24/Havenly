import React from 'react'
import { useState , useEffect } from 'react'
import "./Profile.css"

import fetchWithRefresh from '../../../Utils/fetchWithRefresh'
const Profile = () => {







    useEffect(() => {
     const profile =  async()=>{
const req = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/profile` , {
    : {
        authorization: localStorage.getItem("accessToken")
    },
    credentials: "include"
})

const response  = await req.json()
setuser(response)

     }

     profile()
    }, [])
    
  return (
    <div>
       <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="profile-field">
          <label>Name</label>
          <input
            type="text"
            value={user?.user?.name}
            readOnly
          />
        </div>

        <div className="profile-field">
          <label>Email</label>
          <input
            type="email"
            value={user?.user?.email}
            readOnly
          />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Profile
