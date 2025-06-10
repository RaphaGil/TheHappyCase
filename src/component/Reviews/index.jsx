import React from 'react'

function Review() {
  return (
    <div className='bg-pink-300 h-screen'>
      <div>  <h2>What our Customers say</h2></div>
      <div className='grid grid-cols-3 bg-gray-500'>
        <div className='bg-gray-200 p-4'></div>
        <div className='bg-gray-300 p-4'></div>
        <div className='bg-gray-400 p-4'></div>
      </div>
    </div>
  )
}

export default Review
