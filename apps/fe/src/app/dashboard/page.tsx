'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {

    const [result, setResult] = useState(null)

    useEffect(()=>{
        

        axios.get('http://localhost:3001/api/room/rooms',{
            headers:{
                method: "GET",
                'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik9ta2FyMjM0MSIsImVtYWlsIjoib2phc2RmMjM0MjN3ZUBnbWFpbC5jb20iLCJpYXQiOjE3NzUxOTE0NjB9.Z72IPrhnyTqcVlL1qDfQxPrOmtEX1wp3UAlDlKM5u3U`
            }
        })
        .then(res => {
            console.log(res.data.data);
            setResult(res.data.data);
        })

    },[])

    if (result == null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center p-10">
                <div  className='text-5xl'>The Dashboard of Excalidraw </div>
                <div className="border-2 w-max m-5">
                    <label className='p-7'>Create a room</label>
                    <input className='border-1' type="text" placeholder="eg. chemistry room"/>
                </div>
                <button className='border bg-green-300 p-3 rounded-2xl'>Create</button>
            </div>
            <div className="w-screen h-screen">
                    <div className='grid grid-cols-4'>
                        {(result as any).map((room:any) => (
                            <div key = {room._id} className='m-5 rounded border p-1 h-50 flex flex-col justify-center items-center'>{room.slag}</div>
                        ))}
                </div>
            </div>
        </>
    );
}

export default Dashboard
