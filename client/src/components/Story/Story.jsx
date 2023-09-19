import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import axios from 'axios'

const Story = ({ userId, image, story, user }) => {
  const [userProfileImage, setUserProfileImage] = useState(null)
  const [likeCount, setLikeCount] = useState(0)
  const [like, setLike] = useState(false)

  const fetchUserProfileImage = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/images/user/${user.id}`
      )
      setUserProfileImage(res.data.url)
    } catch (error) {
      console.error('Error fetching user profile image:', error)
    }
  }

  const handleLikes = async () => {
    try {
      const res = await axios.patch(
        'http://localhost:8080/api/likes/toggle-like',
        {
          userId: userId,
          likeableId: story.id,
          likeableType: 'Story',
        }
      )
      setLike(res.data)
    } catch (error) {
      console.error('Error creating like:', error)
    }
  }

  const deleteStory = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/images/${image.id}`)
      alert('Story Deleted')
    } catch (err) {
      alert(err.message)
    }
  }

  const fetchLike = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/likes/story/${story.id}/${userId}`
      )
      setLike(res.data)
    } catch (err) {
      alert(err.message)
    }
  }

  const fetchLikeCount = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/likes/count/story/${story.id}`
      )
      setLikeCount(res.data)
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    fetchLike()
    fetchLikeCount()
    fetchUserProfileImage()
  }, [])

  return (
    <div className='post'>
      <div className='post-header'>
        <div className='post-header-author'>
          {userProfileImage ? (
            <Avatar src={userProfileImage} alt={user.username || ''} />
          ) : (
            <Avatar>{user?.username.charAt(0).toUpperCase()}</Avatar>
          )}
          <span>{user?.username || ''}</span>
        </div>
        {user.id == userId && (
          <button className='' onClick={deleteStory}>
            <DeleteForeverIcon />
          </button>
        )}
      </div>
      <div className='post-img'>
        <img src={image.url} alt='Story' className='rounded' />
      </div>
      <div className='post-footer'>
        <div className='post-footer-icons'>
          <div className='flex flex-col'>
            <button onClick={handleLikes}>
              {!like ? <FavoriteBorderIcon /> : <FavoriteIcon />}
            </button>
            <span>Liked By {likeCount} People</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Story
