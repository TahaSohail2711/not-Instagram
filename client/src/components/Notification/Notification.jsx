import { Avatar } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Notification = ({ userId }) => {
  const [requested, setRequested] = useState([])
  const [requests, setRequestes] = useState([])
  const [avatarUrls, setAvatarUrls] = useState({})
  const [followingUsers, setFollowingUsers] = useState([])

  const fetchFollowingUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/friends/following/${userId}`
      )
      setFollowingUsers(res.data)
    } catch (error) {
      console.error('Error fetching following users:', error)
    }
  }

  const fetchRequestedToFollow = async () => {
    try {
      //  following
      const res = await axios.get(
        `http://localhost:8080/api/friends/requested/${userId}`
      )
      setRequested(res.data)
    } catch (error) {
      console.error('Error fetching requested to follow:', error)
    }
  }

  const fetchRequestedByUser = async () => {
    // followers
    try {
      const res = await axios.get(
        `http://localhost:8080/api/friends/requests/${userId}`
      )
      setRequestes(res.data)
    } catch (error) {
      console.error('Error fetching requested by user:', error)
    }
  }

  const handleAcceptRequest = async (followerId) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/friends/accept/${followerId}`,
        { followingId: userId }
      )
      fetchRequestedByUser()
      fetchFollowingUsers() // Fetch updated following list
      setRequested(requested.filter((user) => user.id !== followerId)) // Remove the accepted user
    } catch (error) {
      console.error('Error accepting request:', error)
    }
  }

  const handleRejectRequest = async (followerId) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/friends/reject/${followerId}`,
        { followingId: userId }
      )
      fetchRequestedByUser()
    } catch (error) {
      console.error('Error accepting request:', error)
    }
  }
  const fetchUserProfileImage = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/images/user/${userId}`
      )
      return res.data.url
    } catch (error) {
      console.error('Error fetching user profile image:', error)
      return null
    }
  }

  const handleFollowBack = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/friends/follow/${id}`,
        {
          userId,
        }
      )
      setRequestes(requests.filter((user) => user.id !== id)) // Remove the accepted user
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  useEffect(() => {
    fetchRequestedToFollow()
    fetchRequestedByUser()
    fetchFollowingUsers()
  }, [])

  useEffect(() => {
    const fetchAvatars = async () => {
      const avatarData = {}

      for (const user of requested.concat(requests)) {
        const avatarUrl = await fetchUserProfileImage(user.id)
        avatarData[user.id] = avatarUrl
      }

      setAvatarUrls(avatarData)
    }

    fetchAvatars()
  }, [requested, requests])

  return (
    <div className='notification p-4'>
      <div className='notification-section mb-6'>
        <h2 className='notification-title text-lg font-semibold mb-2'>
          Requested to Follow
        </h2>
        <div className='notification-list space-y-4'>
          {requested.map((user) => (
            <div className='notification-user flex items-center' key={user.id}>
              <div className='user-avatar'>
                {avatarUrls[user.id] ? (
                  <Avatar src={avatarUrls[user.id]} alt={user.username} />
                ) : (
                  <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
                )}
              </div>
              <div className='user-info ml-4'>
                <span className='text-lg font-semibold'>{user.username}</span>
                <span className='block text-gray-300'>Requested to follow</span>
              </div>
              {/* Render status or actions */}
            </div>
          ))}
        </div>
      </div>
      <div className='notification-section'>
        <h2 className='notification-title text-lg font-semibold mb-2'>
          Requested by User
        </h2>
        <div className='notification-list space-y-4'>
          {requests.map((user) => (
            <div className='notification-user flex items-center' key={user.id}>
              <div className='user-avatar'>
                {avatarUrls[user.id] ? (
                  <Avatar src={avatarUrls[user.id]} alt={user.username} />
                ) : (
                  <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
                )}
              </div>
              <div className='user-info ml-4'>
                <span className='text-lg font-semibold'>{user.username}</span>
                <span className='block'>Requested to follow</span>
              </div>

              <button
                className='accept-button ml-auto bg-blue-900 text-white px-4 py-2 rounded-md'
                onClick={() => handleAcceptRequest(user.id)}
              >
                Accept
              </button>
              <button
                className='accept-button ml-2 bg-red-800 text-white px-4 py-2 rounded-md'
                onClick={() => handleRejectRequest(user.id)}
              >
                Reject
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notification
