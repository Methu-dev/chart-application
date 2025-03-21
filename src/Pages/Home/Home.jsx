import React from 'react'
import Grouplist from '../../Components/HomeComponent/Grouplist'
import Friends from '../../Components/HomeComponent/Friends'
import UserList from '../../Components/HomeComponent/UserList'
import FriendRequest from '../../Components/HomeComponent/FriendRequest'
import Group from '../../Components/HomeComponent/Group'
import BlockedUser from '../../Components/HomeComponent/BlockedUser'

function Home() {
  return (
    <div className='flex justify-between flex-wrap'>
      <div className='w-[400px] px-3 bg-amber-400'>
        <Grouplist />
    </div>

    <div className='w-[400px] bg-amber-400'>
    <Friends />
    </div>

    <div className='w-[400px] bg-amber-400'>
    <UserList />
    </div>

    <div className='w-[400px] bg-amber-400'>
    <FriendRequest />
    </div>

    <div className='w-[400px] bg-amber-400'>
    <Group />
    </div>

    <div className='w-[400px] bg-amber-400'>
    <BlockedUser />
    </div>
    </div>
    
  )
}

export default Home