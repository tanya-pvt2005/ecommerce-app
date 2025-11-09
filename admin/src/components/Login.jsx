// if not authenticated then login page displayed
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendURL } from '../App'
import { toast } from 'react-toastify'
const Login = ({setToken}) => {

    //authenticate 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // console.log(email, password);
    
    

    const onSubmitHandler = async(e)=>{
        try{
            e.preventDefault()
            //api call
            //authenticate using email id and pswd
            const response = await axios.post(backendURL+'/api/user/admin', {email, password})
            // console.log(response)

            if(response.data.success){
                //successful authentication and u get a token
                setToken(response.data.token)

            }
            else{
                //display toast notification
                toast.error(response.data.message)
            }

        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-gray-100'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-72'>
                {/* font-medium = font weight ke baare me */}
                <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                <input className="rounded w-full px-3 py-2 border border-gray-300 outline-none" value={email} type='email'onChange={(e)=>{setEmail(e.target.value)}} placeholder='your@email.com' required></input>
            </div>

            <div className='mb-3 min-w-72'>
                <p>Password</p>
                <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type='password' className="rounded w-full px-3 py-2 border border-gray-300 outline-none" placeholder='Enter your password' required></input>
            </div>

            <button type = "submit" className='mt-2 w-full py-2 px-4 rounded-md bg-black text-white cursor-pointer'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
