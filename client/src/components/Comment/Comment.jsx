import React, { useEffect, useState } from 'react'
import axios from 'axios'

import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import EditIcon from '@mui/icons-material/Edit'
import { Avatar } from '@mui/material'

const Comment = ({ userId, comment, handlePostEdited }) => {
  const [userProfileImage, setUserProfileImage] = useState(null)
  const [likeCount, setLikeCount] = useState(0)
  const [like, setLike] = useState(false)

  const handleLikes = async () => {
    try {
      const res = await axios.patch(
        'http://localhost:8080/api/likes/toggle-like',
        {
          userId: userId,
          likeableId: comment.id,
          likeableType: 'Comment',
        }
      )
      setLike(res.data)
    } catch (error) {
      console.error('Error creating like:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/comments/${comment.id}`)
      alert('Comment Deleted')
    } catch (err) {
      alert(err.message)
    }
  }

  const handleEdit = async () => {
    const newCommentBody = prompt('Edit your comment:', comment.body)
    if (newCommentBody !== null) {
      try {
        await axios.patch(`http://localhost:8080/api/comments/${comment.id}`, {
          body: newCommentBody,
        })
        handlePostEdited()
      } catch (err) {
        alert(err.message)
      }
    }
  }

  const fetchLikeCount = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/likes/count/comment/${comment.id}`
      )
      setLikeCount(res.data)
    } catch (err) {
      alert(err.message)
    }
  }

  const fetchUserProfileImage = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/images/user/${comment.user.id}`
      )
      setUserProfileImage(res.data.url)
    } catch (error) {
      console.error('Error fetching user profile image:', error)
    }
  }

  const fetchLike = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/likes/comment/${comment.id}/${userId}`
      )
      setLike(res.data)
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    fetchUserProfileImage()
    fetchLike()
    fetchLikeCount()
  }, [])

  useEffect(() => {
    fetchUserProfileImage()
    fetchLike()
    fetchLikeCount()
  }, [like])

  return (
    <div className='post h-full w-full rounded-xl border-2 border-b-4 bg-opacity-40 border-slate-400 shadow-md px-8 pt-6 pb-8 mb-4'>
      <div className='post-headers'>
        <div className='post-headers-author'>
          {userProfileImage ? (
            <Avatar src={userProfileImage} alt={comment.user?.username} />
          ) : (
            <Avatar>{comment.user?.username.charAt(0).toUpperCase()}</Avatar>
          )}
          <span>{comment.user?.username}</span>
        </div>
        {comment.user?.id == userId && (
          <div>
            <button className='' onClick={handleEdit}>
              <EditIcon />
            </button>
            <button className='' onClick={handleDelete}>
              <DeleteForeverIcon />
            </button>
          </div>
        )}
      </div>
      <div className='post-body'>
        <span>{comment.body}</span>
      </div>
      <div className='post-footer'>
        <div className='post-footer-icons'>
          <button onClick={handleLikes}>
            <button onClick={handleLikes}>
              {!like ? <FavoriteBorderIcon /> : <FavoriteIcon />}
            </button>
          </button>
        </div>
        <span>Liked By {likeCount} People</span>
      </div>
    </div>
  )
}

export default Comment
