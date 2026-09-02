import React, { useEffect, useState } from 'react'
import db from '../db/db.json'

function Suggestion() {
  const [profile, setProfile] = useState(null)
  const [suggestions, setSuggestions] = useState([])

  const [following, setFollowing] = useState(() => {
    const saved = localStorage.getItem("following")
    return saved ? JSON.parse(saved) : []
  })

  const handleFollow = (user) => {
    setFollowing((prev) => {
      const newFollowing = [...prev, user]

      localStorage.setItem(
        "following",
        JSON.stringify(newFollowing)
      )

      return newFollowing
    })
  }

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile")

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    } else {
      setProfile(db.profile)
    }

    setSuggestions(db.suggestion)
  }, [])

  return (
    <div>
      <div className="suggestion w-75 m-4">

        {profile ? (
          <div className="d-flex">
            <img
              className="dp rounded-circle"
              src={import.meta.env.BASE_URL + profile.profile_pic}
              alt="profile pic"
            />

            <h5>{profile.username}</h5>

            <small className="ms-auto text-primary">
              Switch
            </small>
          </div>
        ) : (
          <p>Loading</p>
        )}

        <div className="d-flex m-2">
          <p>Suggestion for you</p>
          <b className="ms-auto">See all</b>
        </div>

        {suggestions.length > 0 ? (
          <div>
            {suggestions.map((suggestion) => {
              const isFollowing = following.some(
                (item) => item.id === suggestion.id
              )

              return (
                <div className="my-1" key={suggestion.id}>
                  <div className="d-flex">

                    <img
                      className="dp rounded-circle"
                      src={
                        import.meta.env.BASE_URL +
                        suggestion.profile_pic
                      }
                      alt="profile pic"
                    />

                    <h5>{suggestion.username}</h5>

                    <button
                      className="ms-auto btn btn-link text-primary"
                      onClick={() => {
                        if (!isFollowing) {
                          handleFollow(suggestion)
                        }
                      }}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </button>

                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div>loading</div>
        )}

      </div>
    </div>
  )
}

export default Suggestion
