import React, { useEffect, useState } from 'react'
import db from '../db/db.json'

function Posts() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        setPosts(db.posts)
    }, [])

    return (
        <div className="d-flex justify-content-center">
            {posts.length > 0 ? (
                <div>
                    {posts.map((post) => (
                        <div className="my-3" key={post.id}>

                            <div className="d-flex">
                                <img
                                    className="dp rounded-circle"
                                    src={import.meta.env.BASE_URL + post.user.profile_pic}
                                    alt="profile pic"
                                />

                                <h5>{post.user.username}</h5>
                            </div>

                            <img
                                className="image"
                                src={import.meta.env.BASE_URL + post.image}
                                alt="post"
                            />

                            <div>
                                <i className="bi bi-heart"></i>
                                <i className="bi bi-chat"></i>
                                <i className="bi bi-send"></i>
                            </div>

                            <div>
                                <b>{post.likes} Likes</b>
                            </div>

                            <p>{post.caption}</p>

                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    loading posts
                </div>
            )}
        </div>
    )
}

export default Posts
