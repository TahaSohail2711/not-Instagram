import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Post from '../Post/Post'

const Activity = ({ userId }) => {
  const [userPosts, setUserPosts] = useState([])

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

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/images/post/${userId}`
        )
        const imagesByPost = groupImagesByPost(res.data)

        setUserPosts(imagesByPost)
      } catch (error) {
        console.error('Error fetching user posts:', error)
      }
    }

    fetchUserPosts()
  }, [])

  const sortedPosts = userPosts.sort((a, b) => {
    const timeA = new Date(a.images[0].createdAt).getTime()
    const timeB = new Date(b.images[0].createdAt).getTime()
    return timeB - timeA
  })

  return (
    <div className='activity'>
      <h2>Your Posts</h2>
      <div className='post-grid'>
        {sortedPosts.map((post) => (
          <Post
            userId={userId}
            key={post.images[0].id}
            images={post.images}
            post={post.images[0].post}
            user={post.images[0].post.user}
          />
        ))}
      </div>
    </div>
  )
}

export default Activity
