import React, { useEffect, useState } from 'react'
import { useParams,Link, useNavigate } from 'react-router-dom'
function Viewstories() {
    const {id,tot}=useParams()
    const[story,setStory]=useState(null)
    const navigate=useNavigate()
    useEffect(()=>{
        fetch(`http://localhost:3000/story/${id}`)
        .then(data=>data.json())
        .then(data=>setStory(data))
        .catch(err=>console.log(err))
    },[id])


    if(id<=0|| id>=4){
      navigate('/');
    }

  return (
    <div>
    {story? <div className="d-flex justify-content-center align-items-center">
        <Link to={`http://localhost:5173/story/${Number(id)-1}/${tot}`}><i className="bi bi-arrow-left-circle-fill"></i></Link>
        <img className="vh-100" src={story.image} alt="loading"/>
        <Link to={`http://localhost:5173/story/${Number(id)+1}/${tot}`}><i className="bi bi-arrow-right-circle-fill"></i></Link>
    </div>:
    <p>Loading..</p>}
    </div>
  )
}

export default Viewstories 