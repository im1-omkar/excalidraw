'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const params = useParams()
  const id = params.id as string
  const num = parseInt(id)

  const isValid = !(isNaN(num) || num < 0 || num > 999)

  useEffect(() => {
    if (!isValid) return

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik9ta2FyMjM0MSIsImVtYWlsIjoib2phc2RmMjM0MjN3ZUBnbWFpbC5jb20iLCJpYXQiOjE3NzUxOTE0NjB9.Z72IPrhnyTqcVlL1qDfQxPrOmtEX1wp3UAlDlKM5u3U"

    const socket = new WebSocket(
      `ws://localhost:8080?roomId=${num}&token=${token}`
    )

    socket.onopen = () => {
      console.log("Socket connected")
    }

    socket.onmessage = (event) => {
      console.log(event.data)
    }

    return () => socket.close()
  }, [isValid])

  if (!isValid) {
    return <div>Invalid number</div>
  }

  return <div>Page number {num}</div>
}