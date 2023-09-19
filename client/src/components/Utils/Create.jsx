import React, { useState } from 'react'
import CreatePost from '../Post/CreatePost'
import CreateStory from '../Story/CreateStory'

const Create = ({ userId, setComponent }) => {
  const [activeTab, setActiveTab] = useState('post')

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }

  return (
    <div className='form'>
      <ul className='tab-group'>
        <li
          className={`tab ${activeTab === 'post' ? 'active' : ''}`}
          onClick={() => handleTabClick('post')}
        >
          <a href='#post'>Post</a>
        </li>
        <li
          className={`tab ${activeTab === 'story' ? 'active' : ''}`}
          onClick={() => handleTabClick('story')}
        >
          <a href='#story'>Story</a>
        </li>
      </ul>

      <div className='tab-content'>
        <div
          id='post'
          style={{ display: activeTab === 'post' ? 'block' : 'none' }}
        >
          <CreatePost userId={userId} setComponent={setComponent} />
        </div>

        <div
          id='story'
          style={{ display: activeTab === 'story' ? 'block' : 'none' }}
        >
          <CreateStory userId={userId} setComponent={setComponent} />
        </div>
      </div>
    </div>
  )
}

export default Create
