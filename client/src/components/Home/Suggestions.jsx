import { Avatar } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Suggestions = ({ userId }) => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [searchFriends, setFriendsSearch] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [friends, setFriends] = useState([])
  const [avatarUrls, setAvatarUrls] = useState({})

  const fetchFriends = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/friends/following/${userId}`
      )
      setFriends(res.data)
    } catch (error) {
      console.error('Error fetching friends:', error)
    }
  }

  const handleFollow = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/friends/follow/${id}`,
        {
          userId,
        }
      )
      setFilteredUsers(filteredUsers.filter((user) => user.id != id))
    } catch (error) {
      console.error('Error:', error.message)
    }
  }
  const handleUnfollow = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/friends/unfollow/${id}`,
        {
          userId,
        }
      )
      setFriends(friends.filter((user) => user.id != id))
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  const getAllUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/users/all')
      const arr = res.data.filter((user) => userId != user.id)
      setUsers(arr)
      filterFollowing(arr)
    } catch (err) {
      alert(err.message)
    }
  }
  const filterFollowing = async () => {
    try {
      await axios.get(`http://localhost:8080/api/friends/requested/${userId}`)
      setFilteredUsers(users.filter((user) => !friends.includes(user)))
    } catch (err) {
      alert(err.message)
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

  const handleSearch = (e) => {
    const searchTerm = e.target.value
    setSearch(searchTerm)

    if (searchTerm === '') {
      setFilteredUsers(users)
    } else {
      const filteredSuggestions = users.filter(
        (user) =>
          !friends.some((friend) => friend.id === user.id) &&
          user.username.includes(searchTerm)
      )
      setFilteredUsers(filteredSuggestions)
    }
  }

  const handleFriendSearch = (e) => {
    const searchTerm = e.target.value
    setFriendsSearch(searchTerm)

    if (searchTerm === '') {
      setFriends(friends)
    } else {
      const filteredFriends = friends.filter((user) =>
        user.username.includes(searchTerm)
      )
      const notFollowing = filteredFriends.filter(
        (user) =>
          !filteredUsers.some((filteredUser) => filteredUser.id === user.id)
      )
      setFriends(notFollowing)
    }
  }

  useEffect(() => {
    fetchFriends()
    getAllUsers()
  }, [])

  useEffect(() => {
    const fetchAvatars = async () => {
      const avatarData = {}

      for (const user of filteredUsers) {
        const avatarUrl = await fetchUserProfileImage(user.id)
        avatarData[user.id] = avatarUrl
      }

      setAvatarUrls(avatarData)
    }

    fetchAvatars()
  }, [filteredUsers])

  return (
    <div className='suggestions flex flex-col justify-between'>
      <div className='suggestion h-full w-full rounded-xl border-2 bg-opacity-40 border-slate-600 shadow-md px-4 pt-2 pb-2 my-1'>
        <div className='suggestions-title'>Suggestions for you</div>
        <div className='search-bar'>
          <input
            type='text'
            placeholder='Search'
            value={search}
            onChange={handleSearch}
            className='appearance-none border border-slate-400 rounded-xl w-full py-2 px-3 text-slate-700 mb-1 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='suggestions-list'>
          {filteredUsers.map((user) => (
            <div className='suggestions-username' key={user.id}>
              <div className='username-left'>
                <span className='avatar'>
                  {avatarUrls[user.id] ? (
                    <Avatar src={avatarUrls[user.id]} alt={user.username} />
                  ) : (
                    <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
                  )}
                </span>
                <div className='username-info'>
                  <span className='username'>{user.username}</span>
                </div>
              </div>
              <button
                className='follow-button'
                onClick={() => handleFollow(user.id)}
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className='friends h-full w-full rounded-xl border-2 bg-opacity-40 border-slate-600 shadow-md px-4 pt-2 pb-2 my-1'>
        <div className='suggestions-title'>Your Friends</div>
        <div className='search-bar'>
          <input
            type='text'
            placeholder='Search'
            value={searchFriends}
            onChange={handleFriendSearch}
            className='appearance-none border border-slate-400 rounded-xl w-full py-2 px-3 text-slate-700 mb-1 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='friends-list p-2'>
          {friends.map((user) => (
            <div className='friend suggestions-username' key={user.id}>
              <div className='username-left'>
                <span className='avatar'>
                  {avatarUrls[user.id] ? (
                    <Avatar src={avatarUrls[user.id]} alt={user.username} />
                  ) : (
                    <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
                  )}
                </span>
                <div className='username-info'>
                  <span className='username'>{user.username}</span>
                </div>
              </div>
              <button
                className='follow-button'
                onClick={() => handleUnfollow(user.id)}
              >
                Un-Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Suggestions
