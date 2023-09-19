import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [gender, setGender] = useState('')
  const [privacy, setPrivacy] = useState('')
  const [dob, setDob] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState(null)

  const [firstNameRequired, setFirstNameRequired] = useState(true)
  const [lastNameRequired, setLastNameRequired] = useState(true)
  const [usernameRequired, setUsernameRequired] = useState(true)
  const [emailRequired, setEmailRequired] = useState(true)
  const [passwordRequired, setPasswordRequired] = useState(true)
  const [confirmPasswordRequired, setConfirmPasswordRequired] = useState(true)
  const [dobRequired, setDobRequired] = useState(true)

  const navigate = useNavigate()

  const addImage = async (userId) => {
    try {
      await axios.post(
        'http://localhost:8080/api/images/create',
        {
          image,
          imageableType: 'User',
          imageableId: userId,
        },
        {
          token: localStorage.getItem('token'),
          CustomHeader: 'custom-value',
        }
      )
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

    const fullName = firstName + ' ' + lastName
    try {
      const res = await axios.post('http://localhost:8080/api/users/signup', {
        username,
        email,
        password,
        fullname: fullName,
        gender,
        privacy,
        dob,
        bio,
      })
      const { user, token } = res.data

      if (
        res.data == 'Username already exists' ||
        res.data == 'Email already exists'
      ) {
        alert(res.data)
      } else if (password !== confirmPassword) {
        alert('Passwords Must Match')
      } else {
        localStorage.setItem('token', token)
        addImage(user.id)
        navigate(`/home/${user.id}`)
      }
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className='signup flex flex-col items-center justify-center text-slate-400 min-h-screen'>
      <h1 className='p-2 mx-2 my-0 text-slate-400 text-4xl mb-4 font-bold'>
        Signup
      </h1>
      <div className='w-full max-w-lg'>
        <form className='rounded-xl border-2 border-b-4 bg-opacity-40 border-slate-400 shadow-md px-8 pt-6 pb-8 mb-4'>
          <div className='mb-2 flex flex-wrap -mx-3'>
            <div className='w-full md:w-1/2 px-3 mb-3 md:mb-0'>
              <label
                className='block text-sm font-bold mb-1 text-slate-400'
                htmlFor='firstName'
              >
                First Name
              </label>
              <input
                className={`appearance-none border bg-slate-900 border-b-4 ${
                  firstNameRequired ? 'border-red-500' : 'border-slate-400'
                } rounded-xl w-full py-2 px-3 text-slate-400 mb-1 leading-tight focus:outline-none focus:shadow-outline`}
                id='firstName'
                type='text'
                placeholder='First Name'
                onChange={(e) => {
                  setFirstName(e.target.value)
                  setFirstNameRequired(false)
                }}
              />
              {firstNameRequired && (
                <p className='text-red-500 text-sm'>Required</p>
              )}
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label
                className='block text-sm font-bold mb-1 text-slate-400'
                htmlFor='lastName'
              >
                Last Name
              </label>
              <input
                className={`appearance-none border bg-slate-900 border-b-4 ${
                  lastNameRequired ? 'border-red-500' : 'border-slate-400'
                } rounded-xl w-full py-2 px-3 text-slate-400 mb-1 leading-tight focus:outline-none focus:shadow-outline`}
                id='lastName'
                type='text'
                placeholder='Last Name'
                onChange={(e) => {
                  setLastName(e.target.value)
                  setLastNameRequired(false)
                }}
              />
              {lastNameRequired && (
                <p className='text-red-500 text-sm'>Required</p>
              )}
            </div>
          </div>

          <div className='mb-2'>
            <label
              className='block text-sm font-bold mb-1 text-slate-400'
              htmlFor='username'
            >
              Username
            </label>
            <input
              className={`appearance-none border bg-slate-900 border-b-4 ${
                usernameRequired ? 'border-red-500' : 'border-white'
              } rounded-xl w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id='username'
              type='text'
              placeholder='Username'
              onChange={(e) => {
                setUsername(e.target.value)
                setUsernameRequired(false)
              }}
            />
            {usernameRequired && (
              <p className='text-red-500 text-sm'>Required</p>
            )}
          </div>

          <div className='mb-2'>
            <label
              className='block text-sm font-bold mb-1 text-slate-400'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className={`appearance-none border bg-slate-900 border-b-4 ${
                emailRequired ? 'border-red-500' : 'border-white'
              } rounded-xl w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id='email'
              type='text'
              placeholder='Email'
              onChange={(e) => {
                setEmail(e.target.value)
                setEmailRequired(false)
              }}
            />
            {emailRequired && <p className='text-red-500 text-sm'>Required</p>}
          </div>

          <div className='mb-2 flex flex-wrap -mx-3'>
            <div className='w-full md:w-1/2 px-3 mb-3 md:mb-0'>
              <label
                className='block text-sm font-bold mb-1 text-slate-400'
                htmlFor='password'
              >
                Password
              </label>
              <input
                className={`appearance-none border bg-slate-900 border-b-4 ${
                  passwordRequired ? 'border-red-500' : 'border-white'
                } rounded-xl w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                id='password'
                type='password'
                placeholder='Password'
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordRequired(false)
                }}
              />
              {passwordRequired && (
                <p className='text-red-500 text-sm'>Required</p>
              )}
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label
                className='block text-sm font-bold mb-1 text-slate-400'
                htmlFor='confirmPassword'
              >
                Confirm Password
              </label>
              <input
                className={`appearance-none border bg-slate-900 border-b-4 ${
                  confirmPasswordRequired ? 'border-red-500' : 'border-white'
                } rounded-xl w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                id='confirmPassword'
                type='password'
                placeholder='Confirm Password'
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setConfirmPasswordRequired(false)
                }}
              />
              {confirmPasswordRequired && (
                <p className='text-red-500 text-sm'>Required</p>
              )}
            </div>
          </div>

          <div className='mb-2'>
            <label
              className='block text-sm font-bold mb-1 text-slate-400'
              htmlFor='dob'
            >
              Date of Birth
            </label>
            <input
              className={`appearance-none border bg-slate-900 border-b-4 ${
                dobRequired ? 'border-red-500' : 'border-white'
              } rounded-xl w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id='dob'
              type='date'
              placeholder='Date of Birth'
              onChange={(e) => {
                setDob(e.target.value)
                setDobRequired(false)
              }}
            />
            {dobRequired && <p className='text-red-500 text-sm'>Required</p>}
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
          </div>

          <div className='mb-6 flex flex-wrap -mx-3'>
            <div className='w-full md:w-1/2 px-3 mb-3 md:mb-0'>
              <label
                className='block text-sm font-bold mb-1 text-slate-400'
                htmlFor='gender'
              >
                Gender
              </label>
              <div className='relative'>
                <select
                  className='appearance-none bg-slate-900 border border-b-4 border-slate-400 rounded-xl w-full py-2 px-3 text-slate-400 mb-1 leading-tight focus:outline-none focus:shadow-outline'
                  id='gender'
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value=''>...</option>
                  <option value='M'>Male</option>
                  <option value='F'>Female</option>
                  <option value='Others'>Others</option>
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
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
