import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Utils/Navbar'
import Timeline from '../components/Home/Timeline'
import Notification from '../components/Notification/Notification'
import Create from '../components/Utils/Create'
import StorySection from '../components/Story/StorySection'
import Profile from '../components/User/Profile'

const Home = () => {
  const { id } = useParams()
  const [component, setComponent] = useState('home')

  return (
    <div className='homepage'>
      <div className='homepage-nav'>
        <Navbar userId={id} setComponent={setComponent} />
      </div>
      <div className='homepage-timeline'>
        {component === 'home' ? (
          <Timeline userId={id} />
        ) : component === 'create' ? (
          <Create userId={id} setComponent={setComponent} />
        ) : component === 'notification' ? (
          <Notification userId={id} />
        ) : component === 'story' ? (
          <StorySection userId={id} />
        ) : (
          <Profile userId={id} setComponent={setComponent} />
        )}
      </div>
    </div>
  )
}

export default Home
