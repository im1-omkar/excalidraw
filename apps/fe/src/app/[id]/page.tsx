'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import DrawingBoard from './drawingTool'

export default function Page() {
  const params = useParams()
  const id = params.id as string
  const num = parseInt(id)

  const [socket, setSocket] = useState<WebSocket | null>(null)

  const isValid = !(isNaN(num) || num < 0 || num > 999)

  useEffect(() => {
    if (!isValid) return

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik9ta2FyMjM0MSIsImVtYWlsIjoib2phc2RmMjM0MjN3ZUBnbWFpbC5jb20iLCJpYXQiOjE3NzUxOTE0NjB9.Z72IPrhnyTqcVlL1qDfQxPrOmtEX1wp3UAlDlKM5u3U"

    const ws = new WebSocket(
      `ws://localhost:8080?roomId=${num}&token=${token}`
    )

    setSocket(ws)

    ws.onopen = () => {
      console.log("Socket connected")
    }

    ws.onmessage = (event) => {
      console.log(event.data)
    }

    return () => {
      ws.close()
    }
  }, [isValid, num])

  if (!isValid) {
    return <div>Invalid number</div>
  }

  return (
    <div className='h-screen w-screen'>
      <div className='fixed top-0 right-0 p-2 m-2 bg-blue-400 rounded-3xl' >Room - {num}</div>

      {socket && <DrawingBoard socket={socket} roomId={num} />}
    </div>
  )
}