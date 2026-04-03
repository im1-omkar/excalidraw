import React from 'react'

const Signup = () => {
  return (
    <>
        <div className=' w-screen h-screen flex flex-col items-center justify-center '>
            <div className='border flex flex-col items-center justify-center'>
                <div className=' p-5 text-4xl flex justify-center'>Signup</div>
                <input type="text" placeholder='email' className='m-4 border' />
                <input type="text" placeholder='userName' className='m-4 border' />
                <input type="password" placeholder='password' className='m-4 border'/>
            </div>
        </div>
    </>
  )
}

export default Signup