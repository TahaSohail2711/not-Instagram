import React, { useEffect, useState } from 'react'
import axios from 'axios'

const EditProfile = ({ userId, setComponent }) => {
  const [fullName, setFullName] = useState('')
  const [privacy, setPrivacy] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState(null)

  const addImage = async (userId) => {
    try {
      await axios.patch(`http://localhost:8080/api/images/user/${userId}`, {
        image,
        imageableType: 'User',
        imageableId: userId,
      })
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

  const submit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.patch(
        `http://localhost:8080/api/users/${userId}`,
        {
          fullname: fullName,
          privacy,
          bio,
        }
      )
      addImage(res.data.id)
      setComponent('home')
    } catch (err) {
      alert(err.message)
    }
  }

  const getUserData = async () => {
    try {
      let res = await axios.get(`http://localhost:8080/api/users/${userId}`)
      const { fullname, privacy, bio } = res.data
      setFullName(fullname)
      setPrivacy(privacy)
      setBio(bio)

      res = await axios.get(`http://localhost:8080/api/images/user/${userId}`)
      setImage(res.data.url)
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div className='signup flex flex-col items-center justify-center text-slate-400 min-h-screen'>
      <h1 className='p-2 mx-2 my-0 text-slate-400 text-4xl mb-4 font-bold'>
        User Profile
      </h1>
      <div className='w-full max-w-lg'>
        <form className='rounded-xl border-2 border-b-4 bg-opacity-40 border-slate-400 shadow-md px-8 pt-6 pb-8 mb-4'>
          <div className='mb-2'>
            <label
              className='block text-sm font-bold mb-1 text-slate-400'
              htmlFor='fullName'
            >
              Full Name
            </label>
            <input
              className='appearance-none border bg-slate-900 border-b-4 border-slate-400 rounded-xl w-full py-2 px-3 text-slate-400 mb-1 leading-tight focus:outline-none focus:shadow-outline'
              id='fullname'
              value={fullName}
              type='text'
              placeholder='Full Name'
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className='mb-2'>
            <label
              className='block text-sm font-bold mb-1 text-slate-400'
              htmlFor='bio'
            >
              Bio
            </label>
            <textarea
              className='appearance-none border bg-slate-900 border-b-4 border-slate-400 rounded-xl w-full py-2 px-3 text-slate-400 mb-1 leading-tight focus:outline-none focus:shadow-outline'
              id='bio'
              rows='4'
              value={bio}
              placeholder='Tell us about yourself...'
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className='mb-2'>
            <label
              className='block text-sm font-bold mb-1 text-slate-400'
              htmlFor='image'
            >
              Profile Image
            </label>
            <input
              type='file'
              id='image'
              onChange={handleImage}
              name='image'
              accept='image/png image/jpeg image/jpg image/jfif'
              className='appearance-none border bg-slate-900 border-b-4 border-slate-400 rounded-xl w-full py-2 px-3 text-slate-400 mb-1 leading-tight focus:outline-none focus:shadow-outline'
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

          <div className='mb-6 flex flex-wrap -mx-3'>
            <div className='w-full md:w-1/2 px-3'>
              <label
                className='block text-sm font-bold mb-1 text-slate-400'
                htmlFor='privacy'
              >
                Privacy
              </label>
              <div className='relative'>
                <select
                  className='appearance-none border bg-slate-900 border-b-4 border-slate-400 rounded-xl w-full py-2 px-3 text-slate-400 mb-1 leading-tight focus:outline-none focus:shadow-outline'
                  id='privacy'
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value)}
                >
                  <option value=''>...</option>
                  <option value='Public'>Public</option>
                  <option value='Private'>Private</option>
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white'>
                  <svg
                    className='fill-current h-4 w-4'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-center'>
            <button
              className='bg-transparent hover:bg-slate-400 text-slate-400 font-bold py-2 px-4 border-2 border-b-4 border-slate-400 hover:border-slate-400 rounded-xl hover:text-black'
              type='submit'
              onClick={submit}
            >
              Edit Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
