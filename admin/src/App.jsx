import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from "./pages/Add"
import List from "./pages/List"
import Orders from "./pages/Orders"
import Login from './components/Login'
import {ToastContainer, toast} from 'react-toastify'

export const backendURL = import.meta.env.VITE_BACKEND_URL

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"");
  // ternary operator: if token available display other ui else login

  //if u reload the webpage, u will be locked out
  //hence use local storage

  useEffect(()=>{
    localStorage.setItem('token', token)
  },[token])

  return (
    <div className='min-h-screen'>
      <ToastContainer></ToastContainer>
      {token === ''
        ? <Login setToken={setToken}/>
        :
        <>
          <Navbar />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">

              {/* Based on the path, renders one of the page components */}
              <Routes>
                <Route path='/add' element={<Add />}></Route>
                <Route path='/list' element={<List />}></Route>
                <Route path='/orders' element={<Orders />}></Route>
              </Routes>
            </div>
          </div>
        </>
      }

    </div>
  )
}

export default App
