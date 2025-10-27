import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Searchbar from './components/Searchbar'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    // It adds responsive left-right padding that increases with screen size — from fixed 16px on mobile to 5–9% of the viewport width on larger screens.

    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar/>
      <Searchbar/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/collection' element = {<Collection/>}/>
        <Route path = '/about' element = {<About/>} />
        <Route path = '/contact' element = {<Contact/>} />
        <Route path = '/product/:pid' element = {<Product/>} />
        <Route path = '/cart' element = {<Cart/>} />
        <Route path = '/login' element = {<Login/>} />
        <Route path = '/place-order' element = {<PlaceOrder/>} />
        <Route path = '/orders' element = {<Orders/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
