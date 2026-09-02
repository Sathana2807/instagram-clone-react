import React, { useEffect, useState } from 'react'
import db from '../db/db.json'

function Profile() {
  const [profile, setProfile] = useState(null)
  const [follower, setFollower] = useState([])

  useEffect(() => {
    setProfile(db.profile)
    setFollower(db.follower)
  }, [])

  function HandleOnChange(e) {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleUpdata = () => {
    alert("Updated")
  }

  const handleUnfollow = (id) => {
    setFollower((prev) =>
      prev.filter((item) => item.id !== id)
    )
    alert("unfollow")
  }

  return (
    <div className='m-3'>

      {profile ? (
        <div>
          <img
            src={import.meta.env.BASE_URL + profile.profile_pic}
            className="profile rounded-circle"
            alt="profile"
          />

          <h5>{profile.username}</h5>

          <input
            type="text"
            name="username"
            value={profile.username}
            className="form-control my-4"
            onChange={HandleOnChange}
          />

          <input
            type="text"
            name="profile_pic"
            value={profile.profile_pic}
            className="form-control"
            onChange={HandleOnChange}
          />

          <button
            className="btn btn-primary my-4"
            onClick={handleUpdata}
          >
            update
          </button>
        </div>
      ) : (
        <div>
          loading profile
        </div>
      )}

      {follower.length > 0 ? (
        follower.map((follower) => (
          <div
            key={follower.id}
            className='d-flex my-2'
          >
            {follower.username}

            <button
              className="btn btn-secondary ms-auto"
              onClick={() => handleUnfollow(follower.id)}
            >
              unfollow
            </button>
          </div>
        ))
      ) : (
        <div>loading follower</div>
      )}

    </div>
  )
}

export default Profile
