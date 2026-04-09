'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {

    const [result, setResult] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [slag, setslag] = useState("");
    const router = useRouter();

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

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-gray-950 text-white text-xl">
            Loading...
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-950 text-white px-6 py-10">

            <div className="max-w-5xl mx-auto mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                    Excalidraw Dashboard
                </h1>
                <p className="text-gray-400">
                    Create and manage your collaborative rooms 
                </p>
            </div>

            <div className="max-w-xl mx-auto mb-12">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">

                    <label className="block text-sm text-gray-400 mb-2">
                        Room Name
                    </label>

                    <div className="flex gap-3">
                        <input 
                            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition"
                            type="text" 
                            value={slag}
                            placeholder="eg. chemistry-room" 
                            onChange={(e)=>setslag(e.target.value)}
                        />

                        <button 
                            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg font-medium shadow"
                            onClick={handleCreateRoom}
                        >
                            Create
                        </button>
                    </div>

                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {result.map((room: any) => (
                    <div 
                        onClick={()=>{router.push(`/${room.roomId}`)}}
                        key={room.roomId} 
                        className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex items-center justify-center text-center shadow hover:shadow-xl hover:scale-[1.02] transition cursor-pointer"
                    >
                        <span className="text-lg font-medium text-gray-200">
                            {room.slag || room.slag}
                        </span>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Dashboard;