import React, { useEffect, useState } from 'react'
import db from '../db/db.json'

function Posts() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const savedPosts = localStorage.getItem('instagramPosts')

        if (savedPosts) {
            setPosts(JSON.parse(savedPosts))
        } else {
            setPosts(
                db.posts.map((post) => ({
                    ...post,
                    liked: false
                }))
            )
        }
    }, [])

    useEffect(() => {
        if (posts.length > 0) {
            localStorage.setItem(
                'instagramPosts',
                JSON.stringify(posts)
            )
        }
    }, [posts])

    const handleHeartClick = (id) => {
        setPosts(posts.map((post) =>
            post.id === id
                ? { ...post, liked: !post.liked }
                : post
        ))
    }

    const handleDoubleClick = (id) => {
        setPosts(posts.map((post) =>
            post.id === id
                ? { ...post, liked: true }
                : post
        ))
    }

    const handleCommentChange = (id, value) => {
        setPosts(posts.map((post) =>
            post.id === id
                ? { ...post, commentInput: value }
                : post
        ))
    }

    const handleComment = (id) => {

        const savedProfile = localStorage.getItem("profile")

        const currentProfile = savedProfile
            ? JSON.parse(savedProfile)
            : db.profile

        setPosts(posts.map((post) => {

            if (post.id === id && post.commentInput?.trim()) {

                return {
                    ...post,
                    comments: [
                        ...(post.comments || []),
                        {
                            user: currentProfile.username,
                            comment: post.commentInput.trim()
                        }
                    ],
                    commentInput: ''
                }
            }

            return post
        }))
    }

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
             alt="profile pic"/>

            <h5>{post.user.username}</h5>

            </div>

            <img
             className="image"
             src={import.meta.env.BASE_URL + post.image}
             alt="post"
             onDoubleClick={() => handleDoubleClick(post.id)}
            />

            <div>

                <i
                 className={`bi ${post.liked ? 'bi-heart-fill text-danger' : 'bi-heart'}`}
                 onClick={() => handleHeartClick(post.id)}
                 style={{cursor: 'pointer'}}
                ></i>

                <i
                 className="bi bi-chat"
                 onClick={() =>
                    document
                    .getElementById(`comment-${post.id}`)
                    ?.focus()
                 }
                 style={{cursor: 'pointer'}}
                ></i>

                <i className="bi bi-send"></i>

            </div>

            <div>

            <b>{post.likes + (post.liked ? 1 : 0)} Likes</b>

            </div>

            <p>{post.caption}</p>

            <div>

                {post.comments?.map((comment, index) => (

                    <p key={index}>
                        <b>{comment.user}:</b> {comment.comment}
                    </p>

                ))}

                <div className="d-flex">

                    <input
                     id={`comment-${post.id}`}
                     type="text"
                     placeholder="Add a comment..."
                     value={post.commentInput || ''}
                     onChange={(e) =>
                        handleCommentChange(
                            post.id,
                            e.target.value
                        )
                     }
                     onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleComment(post.id)
                        }
                     }}
                     className="form-control"
                    />

                    <button
                     className="btn btn-primary"
                     onClick={() => handleComment(post.id)}
                    >
                        send
                    </button>

                </div>

            </div>

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
