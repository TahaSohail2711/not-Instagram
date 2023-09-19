import React, { useState } from 'react'
import axios from 'axios'

import Loader from '../Utils/Loader'

const CreatePost = ({ userId, setComponent }) => {
  const [loading, setLoading] = useState(false)
  const [des, setDes] = useState('')
  const [images, setImages] = useState([])

  const addImage = async (postId) => {
    try {
      for (const image of images) {
        await axios.post('http://localhost:8080/api/images/create', {
          image,
          imageableType: 'Post',
          imageableId: postId,
        })
      }
    } catch (err) {
      alert(err.message)
    }
  }

  const handleImage = (e) => {
    const files = e.target.files
    const newImages = []

    for (const file of files) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        if (newImages.length < 10) {
          newImages.push(reader.result)
        }
        if (newImages.length === files.length) {
          setImages((prevImages) => [...prevImages, ...newImages])
        }
      }
    }
  }

  const createPost = async () => {
    try {
      setLoading(true)
      const res = await axios.post('http://localhost:8080/api/posts/create', {
        description: des,
        userId,
      })
      await addImage(res.data)
      setLoading(false)
      setComponent('home')
    } catch (err) {
      alert(err.message)
      setLoading(false)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    await createPost()
  }

  return (
    <div className='create-post flex flex-col items-center justify-center'>
      <h1 className='p-2 mx-2 my-0 text-slate-400 text-4xl mb-4 font-bold '>
        Create Post
      </h1>
      <div className='w-full max-w-lg'>
        {loading ? (
          <Loader />
        ) : (
          <form className='h-full w-full rounded-xl border-2 border-b-4 bg-opacity-40 border-slate-400 shadow-md px-8 pt-6 pb-8 mb-4'>
            <div className='mb-2 flex flex-wrap -mx-3'>
              <div className='w-full px-3'>
                <label
                  className='block text-slate-400 text-sm font-bold mb-1'
                  htmlFor='pic'
                >
                  Picture
                </label>
                <input
                  type='file'
                  id='file'
                  onChange={handleImage}
                  name='image'
                  required
                  multiple
                  accept='image/png image/jpeg image/jpg image/jfif'
                  className='appearance-none border border-b-4 border-slate-400 rounded-xl w-full py-2 px-3 text-slate-400 mb-1 leading-tight focus:outline-none focus:shadow-outline'
                />
                <div className='flex overflow-x-auto'>
                  {images.map((imageDataUrl, index) => (
                    <div key={index} className='flex-shrink-0'>
                      <img
                        src={imageDataUrl}
                        alt=''
                        className='w-20 h-20 mr-1 mt-1 object-cover rounded'
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='mb-2'>
              <label
                className='block text-slate-400 text-sm font-bold mb-1'
                htmlFor='des'
              >
                Description
              </label>
              <input
                className='appearance-none border border-b-4 border-slate-400 rounded-xl w-full py-2 px-3 text-slate-800 mb-1 leading-tight focus:outline-none focus:shadow-outline'
                id='des'
                type='text'
                placeholder='Description'
                onChange={(e) => setDes(e.target.value)}
              />
            </div>

            <div className='flex items-center justify-center'>
              <button
                className='bg-transparent hover:bg-slate-400 text-slate-400 hover:text-white font-bold py-2 px-4 border-2 border-b-4 border-slate-400 hover:border-slate-400 rounded-xl'
                type='submit'
                onClick={submit}
              >
                Post
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default CreatePost
