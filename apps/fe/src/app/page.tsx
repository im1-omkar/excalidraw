import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {

  const  cookieStore = await cookies()
  const token:any = cookieStore.get('token')

  if(token){
    redirect('/dashboard')
  }
  

  return (
      <div className="w-screen h-screen bg-linear-to-br from-gray-900 to-black text-white flex flex-col">
      
        <div className="flex justify-end p-6 gap-4">
          <Link href="/signin">
            <button className="px-4 py-2 rounded-xl border border-gray-600 hover:bg-gray-800 transition">
              Sign In
            </button>          
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 rounded-xl bg-white text-black hover:bg-gray-200 transition font-medium">
              Sign Up
            </button>
          </Link>
        </div>

        <div className="flex flex-1 justify-center items-center">
          <div className="flex flex-col items-center text-center border border-gray-700 rounded-2xl p-10 shadow-lg backdrop-blur-md bg-white/5">

            <h1 className="text-5xl font-bold mb-4 tracking-tight">
              The Excalidraw 
            </h1>

            <p className="text-gray-400 text-lg mb-6 max-w-md">
              Sketch ideas, collaborate in real-time, and bring your thoughts to life visually.
            </p>

            <Link href='signin'>
              <button  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition">
                Start Drawing
              </button>
            </Link>

          </div>
        </div>
    </div>
  );
}
