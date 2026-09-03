import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import db from '../db/db.json'

function Viewstories() {
  const { id, tot } = useParams()
  const [story, setStory] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const data = db.story.find((item) => String(item.id) === String(id))
    setStory(data)
  }, [id])

  if (id <= 0 || id >= 4) {
    navigate('/')
  }

  return (
    <div>
      {story ? (
        <div className="d-flex justify-content-center align-items-center">

          <Link to={`/story/${Number(id) - 1}/${tot}`}>
            <i className="bi bi-arrow-left-circle-fill"></i>
          </Link>

          <img
            className="vh-100"
            src={import.meta.env.BASE_URL + story.image}
            alt="story"
          />

          <Link to={`/story/${Number(id) + 1}/${tot}`}>
            <i className="bi bi-arrow-right-circle-fill"></i>
          </Link>

        </div>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  )
}
export default Viewstories