import React, { useEffect, useState } from 'react'
import axios from 'axios'

import HomeIcon from '@mui/icons-material/Home'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ExploreIcon from '@mui/icons-material/Explore'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ userId, setComponent }) => {
  const [userProfileImage, setUserProfileImage] = useState(null)
  const [user, setUser] = useState({})

  const navigate = useNavigate()

  const fetchUserProfileImage = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/images/user/${userId}`
      )
      setUserProfileImage(res.data.url)
    } catch (error) {
      console.error('Error fetching user profile image:', error)
    }
  }

  const handleLogout = async () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/users/${userId}`)
      setUser(res.data)
      fetchUserProfileImage()
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    } else {
      getUser()
    }
  }, [])

  return (
    <div className='sidenav'>
      <h3 className='sidenav-logo'>not-Instagram</h3>
      <div className='sidenav-btns'>
        <button
          className='sidenav-btn'
          onClick={(e) => {
            setComponent('home')
          }}
        >
          <HomeIcon />
          <span>Home</span>
        </button>

        <button
          className='sidenav-btn'
          onClick={(e) => {
            setComponent('story')
          }}
        >
          <ExploreIcon />
          <span>Stories</span>
        </button>

        <button
          className='sidenav-btn'
          onClick={(e) => {
            setComponent('notification')
          }}
        >
          <FavoriteBorderIcon />
          <span>Notifications</span>
        </button>

        <button
          className='sidenav-btn'
          onClick={(e) => {
            setComponent('create')
          }}
        >
          <AddCircleOutlineIcon />
          <span>Create</span>
        </button>

        <button onClick={handleLogout} className='sidenav-btn'>
          <span>Logout</span>
        </button>
      </div>
      <div className='sidenav-more'>
        <button className='sidenav-btn' onClick={() => setComponent('profile')}>
          <div className='post-header-author'>
            {userProfileImage ? (
              <Avatar src={userProfileImage} alt={user.username} />
            ) : (
              <Avatar>
                {user.username ? user.username.charAt(0).toUpperCase() : ''}
              </Avatar>
            )}
            <span>{user.username}</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Navbar
