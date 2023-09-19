import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Carousel } from 'react-responsive-carousel'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Avatar } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import CommentSection from '../Comment/CommentSection'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 600,
  bgcolor: '#FFFFFF',
  color: '#000000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
}

const Post = ({ userId, images, post, user, handlePostEdited }) => {
  const [userProfileImage, setUserProfileImage] = useState(null)
  const [commentModalOpen, setCommentModalOpen] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [like, setLike] = useState(false)

  const handleOpenCommentModal = () => setCommentModalOpen(true)
  const handleCloseCommentModal = () => setCommentModalOpen(false)

  const handleLikes = async () => {
    try {
      const res = await axios.patch(
        'http://localhost:8080/api/likes/toggle-like',
        {
          userId: userId,
          likeableId: post.id,
          likeableType: 'Post',
        }
      )
      setLike(res.data)
    } catch (err) {
      alert(err.message)
    }
  }

  const handleEdit = async () => {
    const postBody = prompt('Edit your comment:', post.description)
    if (postBody !== null) {
      try {
        await axios.patch(`http://localhost:8080/api/posts/${post.id}`, {
          description: postBody,
        })
        handlePostEdited()
      } catch (err) {
        alert(err.message)
      }
    }
  }

  const handleDelete = async () => {
    try {
      for (const postImage of images) {
        await axios.delete(`http://localhost:8080/api/images/${postImage.id}`)
      }
      alert('Post Deleted')
    } catch (err) {
      alert(err.message)
    }
  }

  const fetchLike = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/likes/post/${post.id}/${userId}`
      )
      setLike(res.data)
    } catch (err) {
      alert(err.message)
    }
  }

  const fetchLikeCount = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/likes/count/post/${post.id}`
      )
      setLikeCount(res.data)
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    fetchLike()
    fetchLikeCount()
  }, [])

  useEffect(() => {
    fetchLike()
    fetchLikeCount()
  }, [like])

  useEffect(() => {
    const fetchUserProfileImage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/images/user/${user.id}`
        )
        setUserProfileImage(res.data.url)
      } catch (err) {
        alert(err.message)
      }
    }

    fetchUserProfileImage()
  }, [user?.id])

  return (
    <div className='post rounded-3xl border-2 p-2 px-4 border-zinc-700'>
      <div className='post-header'>
        <div className='post-header-author'>
          {userProfileImage ? (
            <Avatar src={userProfileImage} alt={user?.username} />
          ) : (
            <Avatar>{user?.username.charAt(0).toUpperCase()}</Avatar>
          )}
          <span>{user?.username}</span>
        </div>
        {user.id == userId && (
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
      <div className='post-img'>
        {images.length > 0 && (
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            className='p-2'
          >
            {images.map((postImage) => (
              <div key={postImage.id}>
                <img
                  src={postImage.url}
                  alt='Post'
                  className='rounded max-w-md max-h-80 object-contain'
                />
              </div>
            ))}
          </Carousel>
        )}
      </div>

      <div className='post-footer flex flex-col mt-2 pt-1 font-semibold justify-center items-center'>
        <span>{post.description}</span>
        <div className='flex flex-row mx-auto font-light'>
          <button onClick={handleLikes} className='p-1 m-1'>
            {!like ? <FavoriteBorderIcon /> : <FavoriteIcon />}
          </button>
          <span className='p-1 m-1'>{likeCount} Likes</span>
          <button onClick={handleOpenCommentModal} className='p-1 m-1'>
            <ChatBubbleOutlineIcon />
          </button>
        </div>
      </div>
      <Modal
        open={commentModalOpen}
        onClose={handleCloseCommentModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <CommentSection userId={userId} postId={post.id} />
        </Box>
      </Modal>
    </div>
  )
}

export default Post
