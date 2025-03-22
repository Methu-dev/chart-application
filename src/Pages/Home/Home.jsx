import React from 'react'
import Grouplist from '../../Components/HomeComponent/Grouplist'
import Friends from '../../Components/HomeComponent/Friends'
import UserList from '../../Components/HomeComponent/UserList'
import FriendRequest from '../../Components/HomeComponent/FriendRequest'
import Group from '../../Components/HomeComponent/Group'
import BlockedUser from '../../Components/HomeComponent/BlockedUser'

function Home() {
  return (
    <div className='flex justify-between flex-wrap gap-y-2'>
      <div className='w-[400px] px-3 bg-amber-400'>
        <Grouplist />
    </div>

    <div className='w-[400px]'>
    <Friends />
    </div>

    <div className='w-[400px]'>
    <UserList />
    </div>

    <div className='w-[400px]'>
    <FriendRequest />
    </div>

    <div className='w-[400px]'>
    <Group />
    </div>

    <div className='w-[400px]'>
    <BlockedUser />
    </div>
    </div>
    
  )
}

export default Home