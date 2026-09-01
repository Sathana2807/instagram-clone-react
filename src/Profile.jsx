import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {
    const[profile,setProfile]=useState(null)
    const[follower,setFollower]=useState([])
    const[unfollow,setUnfollow]=useState(0)
    useEffect(()=>{
        axios.get('http://localhost:3000/profile')
        .then(data=>{setProfile(data.data);})
        .catch(err=>console.log(err))

        axios.get('http://localhost:3000/follower')
        .then(data=>{setFollower(data.data)})
        .catch(err=>console.log(err))
    },[unfollow])

function HandleOnChange(e){
    setProfile((prev)=>({
        ...prev,
        [e.target.name]: e.target.value
    }))
}
const handleUpdata =async()=>{
    axios.put('http://localhost:3000/profile',profile)
    .then(console.log("Updated"))
    .catch(err=> console.log(err))
}
const handleUnfollow=async(id)=>{
    axios.delete(`http://localhost:3000/follower/${id}`)
    .then(alert("unfollow"))
    .then(setUnfollow(!unfollow))
    .catch(err=>console.log(err))
}
  return (
    <div className='m-3'>
        {profile ?(
        <div>
            <img src={profile.profile_pic} className="profile rounded-circle"></img>
          <h5>{profile.username} </h5>
          <input type="text" 
            name="username"
            value={profile.username}
            className="form-control my-4"
            onChange={HandleOnChange}
        />
        <input type='text' 
            name="profile_pic" 
            value={profile.profile_pic}
            className="form-control"
            onChange={HandleOnChange}
        />
        <button className="btn btn-primary my-4" onClick={handleUpdata}>
            update
        </button>
        </div>):
        (<div>
            loading profile
        </div>
        )}
       {follower.length>0 ?(
        follower.map(follower=>(
            <div key={follower.id} className='d-flex my-2'>
                {follower.username}
                {<button className="btn btn-secondary ms-auto"
                    onClick={()=>{handleUnfollow(follower.id)}}
                >unfollow</button>}
            </div>
        ))
       ):
       (<div>loading follower</div>)}
    </div>
  )
}
export default Profile