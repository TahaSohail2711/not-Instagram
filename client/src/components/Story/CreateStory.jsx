import React, { useState } from 'react'
import axios from 'axios'

import Loader from '../Utils/Loader'

const CreateStory = ({ userId, setComponent }) => {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)

  const addImage = async (storyId) => {
    try {
      if (image) {
        await axios.post('http://localhost:8080/api/images/create', {
          image,
          imageableType: 'Story',
          imageableId: storyId,
        })
      }
    } catch (err) {
      alert(err.message)
    }
  }

  const setFileToBase = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImage(reader.result)
    }
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    setFileToBase(file)
  }

  const createStory = async () => {
    try {
      setLoading(true)
      const res = await axios.post('http://localhost:8080/api/story/create', {
        userId,
      })
      await addImage(res.data.id)
      setLoading(false)
      setComponent('home')
    } catch (err) {
      alert(err.message)
      setLoading(false)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    await createStory()
  }

  return (
    <div className='create-story flex flex-col items-center justify-center'>
      <h1 className='p-2 mx-2 my-0 text-slate-400 text-4xl mb-4 font-bold '>
        Create Story
      </h1>
      <div className='w-full max-w-lg'>
        {loading ? (
          <Loader />
        ) : (
          <form className='h-full w-full rounded-xl border-2 border-b-4 bg-opacity-40 border-slate-400 shadow-md px-8 pt-6 pb-8 mb-4'>
            <div className='mb-2'>
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
                accept='image/png image/jpeg image/jpg image/jfif'
                className='appearance-none border border-b-4 border-slate-400 rounded-xl w-full py-2 px-3 text-slate-400 mb-1 leading-tight focus:outline-none focus:shadow-outline'
              />
              {image && (
                <div className='mt-2'>
                  <img
                    src={image}
                    alt='Selected'
                    className='w-20 h-20 object-cover rounded'
                  />
                </div>
              )}
            </div>

            <div className='flex items-center justify-center'>
              <button
                className='bg-transparent hover:bg-slate-400 text-slate-400 hover:text-white font-bold py-2 px-4 border-2 border-b-4 border-slate-400 hover:border-slate-400 rounded-xl'
                type='submit'
                onClick={submit}
              >
                Story
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default CreateStory
