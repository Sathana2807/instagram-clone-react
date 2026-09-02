import React, { useEffect, useState } from 'react'
import db from '../db/db.json'

function Suggestion() {
  const [profile, setProfile] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const handleFollow = (id, username) => {
    alert('followed')
  }
  useEffect(() => {
    setProfile(db.profile)
    setSuggestions(db.suggestion)
  }, [])

  return (
    <div>
      <div className="suggestion w-75 m-4">

        {profile ? (
          <div className="d-flex">
            <img className="dp rounded-circle"
              src={import.meta.env.BASE_URL + profile.profile_pic}
              alt="profile pic"/>
            <h5>{profile.username}</h5>
            <small className="ms-auto text-primary">Switch</small>
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
            {suggestions.map((suggestion) => (
              <div className="my-1" key={suggestion.id}>
                <div className="d-flex">
                  <img className="dp rounded-circle"
                    src={
                      import.meta.env.BASE_URL +
                      suggestion.profile_pic
                    }alt="profile pic"/>
                  <h5>{suggestion.username}</h5>
                  <a className="ms-auto text-primary"
                    onClick={() =>handleFollow(suggestion.id,suggestion.username)} >
                    Follow</a>
                    </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            loading
          </div>
        )}
      </div>
    </div>
  )
}
export default Suggestion
