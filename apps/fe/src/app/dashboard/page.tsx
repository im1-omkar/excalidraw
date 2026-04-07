'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {

    const [result, setResult] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [slag, setslag] = useState("");

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik9ta2FyMjM0MSIsImVtYWlsIjoib2phc2RmMjM0MjN3ZUBnbWFpbC5jb20iLCJpYXQiOjE3NzUxOTE0NjB9.Z72IPrhnyTqcVlL1qDfQxPrOmtEX1wp3UAlDlKM5u3U";

    useEffect(() => {

        axios.get('http://localhost:3001/api/room/rooms', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
            setResult(res.data.data);
            setLoading(false);
        })
        .catch(() => setLoading(false));
        
    }, []);

    const handleCreateRoom = async () => {
        try {
            
            const response = await axios.post('http://localhost:3001/api/room/create', 
                { slag: slag }, 
                { headers: { 'Authorization': `Bearer ${token}` } } 
            );

           
            if (response.data) {
                setResult(prev => [...prev, response.data.data]);
                setslag(""); 
            }

        } catch (err) {
            console.error("error while creating room", err);
        }
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-10">

            <div className="flex flex-col items-center mb-10">

                <h1 className='text-5xl mb-5'>Excalidraw Dashboard</h1>
                <div className="flex gap-2 border-2 p-4 rounded">
                    <label>Room Name:</label>
                    <input 
                        className='border px-2' 
                        type="text" 
                        value={slag}
                        placeholder="eg. chemistry-room" 
                        onChange={(e)=>setslag(e.target.value)}
                    />
                    <button 
                        className='bg-green-300 px-4 py-1 rounded-xl hover:bg-green-400' 
                        onClick={handleCreateRoom}
                    >
                        Create
                    </button>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                {result.map((room: any) => (
                    <div key={room._id} className='rounded border p-10 flex justify-center items-center shadow-sm'>
                        {room.slag || room.slag}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
