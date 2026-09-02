import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import db from '../db/db.json'

function Stories() {
  const [Stories, setStories] = useState([])
  const navigate = useNavigate()
  let tot = 0

  useEffect(() => {
    setStories(db.story)
  }, [])

  return (
    <div className="story d-flex">
      <div className="d-none">
        {tot = Stories.length}
      </div>

      {Stories.length > 0 ? (
        Stories.map((story) => (
          <div key={story.id} className="mx-1"
            onClick={() => {navigate(`/story/${story.id}/${tot}`)
            }}>
            <div className="gradient-border">
              <img src={import.meta.env.BASE_URL + story.user.profile_pic} alt="dp" className="story-dp rounded-circle"
              />
            </div>

            <p className="text-truncate" style={{ width: "50px" }}>
              {story.user.username}
            </p>
          </div>
        ))
      ) : (
        <p>
          Loading...
        </p>
      )}
    </div>
  )
}

export default Stories