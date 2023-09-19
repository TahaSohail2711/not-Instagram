import React, { useState } from 'react'
import Activity from './Activity'
import EditProfile from './EditProfile'

const Profile = ({ userId, setComponent }) => {
  const [activeTab, setActiveTab] = useState('activity')

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }

  return (
    <div className='form bg-transparent'>
      <ul className='tab-group'>
        <li
          className={`tab ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => handleTabClick('activity')}
        >
          <a href='#activity'>All Posts</a>
        </li>
        <li
          className={`tab ${activeTab === 'edit' ? 'active' : ''}`}
          onClick={() => handleTabClick('edit')}
        >
          <a href='#edit'>Edit Profile</a>
        </li>
      </ul>

      <div className='tab-content'>
        <div
          id='activity'
          style={{ display: activeTab === 'activity' ? 'block' : 'none' }}
        >
          <Activity userId={userId} setComponent={setComponent} />
        </div>

        <div
          id='edit'
          style={{ display: activeTab === 'edit' ? 'block' : 'none' }}
        >
          <EditProfile userId={userId} setComponent={setComponent} />
        </div>
      </div>
    </div>
  )
}

export default Profile
