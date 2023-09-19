import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'

const CommentSection = ({ userId, postId }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [refresh, setRefresh] = useState(false)

  const handlePostEdited = () => {
    setRefresh((prev) => !prev)
  }

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/comments/all/${postId}`
      )
      setComments(res.data)
    } catch (err) {
      alert(err.message)
    }
  }

  const createComment = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/comments/create`,
        {
          body: newComment,
          userId: userId,
          postId,
        }
      )
      setComments([...comments, res.data])
      setNewComment('')
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  useEffect(() => {
    fetchComments()
  }, [refresh])

  return (
    <div className='comment-modal'>
      <div className='comment-input flex flex-col justify-center'>
        <textarea
          placeholder='Add a comment...'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className='p-2 appearance-none border border-b-4 border-slate-400 rounded-xl w-full py-2 px-3 text-slate-800 mb-1 leading-tight focus:outline-none focus:shadow-outline'
        />

        <button
          onClick={createComment}
          className='bg-transparent hover:bg-slate-400 text-slate-400 hover:text-white font-bold py-2 px-4 border-2 border-b-4 border-slate-400 hover:border-slate-400 rounded-xl'
        >
          Comment
        </button>
      </div>
      <div className='comments-list'>
        {comments.map((comment) => (
          <Comment
            userId={userId}
            comment={comment}
            handlePostEdited={handlePostEdited}
          />
        ))}
      </div>
    </div>
  )
}

export default CommentSection
