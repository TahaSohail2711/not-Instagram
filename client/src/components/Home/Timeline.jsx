import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Suggestions from './Suggestions'
import Post from '../Post/Post'

const Timeline = ({ userId }) => {
  const [posts, setPosts] = useState([])
  const [followingUsers, setFollowingUsers] = useState([])
  const [refresh, setRefresh] = useState(false)

  const handlePostEdited = () => {
    setRefresh((prev) => !prev)
  }

  const fetchImages = async () => {
    try {
      const result = await axios.get(
        'http://localhost:8080/api/images/post/all'
      )
      const imagesByPost = groupImagesByPost(result.data)
      setPosts(imagesByPost)
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

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

  const groupImagesByPost = (images) => {
    const imagesByPost = {}

    images.forEach((image) => {
      const postId = image.imageableId

      if (!imagesByPost[postId]) {
        imagesByPost[postId] = {
          images: [image],
        }
      } else {
        imagesByPost[postId].images.push(image)
      }
    })

    return Object.values(imagesByPost)
  }

  const sortedPosts = posts.sort((a, b) => {
    const timeA = new Date(a.images[0].createdAt).getTime()
    const timeB = new Date(b.images[0].createdAt).getTime()
    return timeB - timeA
  })

  const shouldShowPost = (postUserPrivacy, postUserId) => {
    if (postUserPrivacy === 'Public') {
      return true
    } else if (postUserPrivacy === 'Private') {
      return followingUsers.some((user) => user.id === postUserId)
    }
    return false
  }

  useEffect(() => {
    fetchImages()
  }, [])

  useEffect(() => {
    fetchFollowingUsers()
  }, [userId])

  useEffect(() => {
    fetchImages()
  }, [refresh])

  return (
    <div className='timeline py-4 mx-auto'>
      <div className='timeline-left'>
        <div className='timeline-posts px-8'>
          {sortedPosts.map((post) => {
            const postUserPrivacy = post.images[0].post.user.privacy
            const postUserId = post.images[0].post.user.id
            const shouldDisplayPost = shouldShowPost(
              postUserPrivacy,
              postUserId
            )
            if (postUserId == userId || shouldDisplayPost) {
              return (
                <Post
                  handlePostEdited={handlePostEdited}
                  userId={userId}
                  key={post.images[0].id}
                  images={post.images}
                  post={post.images[0].post}
                  user={post.images[0].post.user}
                />
              )
            }

            return null
          })}
        </div>
      </div>
      <div className='timeline-right'>
        <Suggestions userId={userId} />
      </div>
    </div>
  )
}

export default Timeline
