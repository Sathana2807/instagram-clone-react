import React, { useEffect, useState } from 'react'
import db from '../db/db.json'

function Profile() {

  const [profile, setProfile] = useState(null)
  const [follower, setFollower] = useState([])

  const [following, setFollowing] = useState(() => {
    const saved = localStorage.getItem("following")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {

    const savedProfile = localStorage.getItem("profile")

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    } else {
      setProfile(db.profile)
    }

    setFollower(db.follower)

  }, [])

  function HandleOnChange(e) {

    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

  }

  const handleUpdata = () => {

    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    )

    alert("Updated")
  }

  const handleUnfollow = (id) => {

    setFollowing((prev) => {

      const newFollowing = prev.filter(
        (item) => item.id !== id
      )

      localStorage.setItem(
        "following",
        JSON.stringify(newFollowing)
      )

      return newFollowing
    })

    alert("Unfollowed")
  }

  return (
    <div className="m-3">

      {profile ? (
        <div>

          <img
            src={
              import.meta.env.BASE_URL +
              profile.profile_pic
            }
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
        <div>loading profile</div>
      )}

      <h4 className="mt-4">Following</h4>
      {following.length > 0 ? (
        following.map((user) => (
          <div
            key={user.id}
            className="d-flex my-2 align-items-center"
          >
            <img
              src={
                import.meta.env.BASE_URL +
                user.profile_pic
              }
              className="dp rounded-circle"
              alt="profile"
            />

            <h5 className="ms-2 mb-0">
              {user.username}
            </h5>

            <button
              className="btn btn-secondary ms-auto"
              onClick={() =>
                handleUnfollow(user.id)
              }
            >
              Unfollow
            </button>
          </div>
        ))
      ) : (
        <p>No following</p>
      )}

      <h4 className="mt-4">Followers</h4>
      {follower.length > 0 ? (
        follower.map((item) => (
          <div
            key={item.id}
            className="d-flex my-2"
          >
            {item.username}
          </div>
        ))
      ) : (
        <div>loading follower</div>
      )}
    </div>
  )
}
export default Profile
