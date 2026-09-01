import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Suggestion() {
  const[profile,setProfile]=useState(null)
  const[suggestions,setSuggestions]=useState([])

  const handleFollow=async(id,username)=>{
    axios.post('http://localhost:3000/follower',{"id":id,"username":username})
    .then(alert('followed'))
    .catch(err=>console.log(err))
  }
  useEffect(()=>{
    fetch("http://localhost:3000/profile")
    .then(data=>data.json())
    .then(data =>setProfile(data))
    .catch(err=>console.log(err))

    fetch("http://localhost:3000/suggestion")
    .then(data=>data.json())
    .then(data =>setSuggestions(data))
    .catch(err=>console.log(err))
  },[])
  return (
    <div>
      <div className="suggestion w-75 m-4">
      {profile ?
      <div className="d-flex">
      <img className="dp rounded-circle" src={profile.profile_pic} alt="profile pic"/>
      <h5>{profile.username}</h5>
      <small className="ms-auto text-primary">Switch</small>
      </div>:
      <p>Loading</p>
      }
      <div className="d-flex m-2">
      <p>Suggestion for you</p>
      <b className="ms-auto">See all</b>
      </div>
      {suggestions.length>0 ?(
            <div> 
            {suggestions.map((suggestion)=>(
                <div className="my-1" key={suggestion.id}> 
                    <div className="d-flex">
                        <img className="dp rounded-circle" src={suggestion.profile_pic} alt="profile pic"/>
                        <h5>{suggestion.username}</h5>
                        <a className="ms-auto text-primary" onClick={()=>{handleFollow(suggestion.id,suggestion.username)}}>Follow</a>
                    </div>
                </div>
            ))}
            </div>
            ):(
                <div>
                    loading 
                </div>
            )}
    </div>
    </div>
  )
}
export default Suggestion