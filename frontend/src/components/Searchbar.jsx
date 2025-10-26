import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom'

const Searchbar = () => {

    const {search, setSearch, showSearch, setShowSearch}  = useContext(ShopContext)
    const [visible, setVisible] = useState(false)
    //only to show it in one location: Collections page => useLocation hook; using location hook, u can get the path of url
    const location = useLocation();

    useEffect(()=>{
        // console.log(location.pathname)
        if(location.pathname.includes('collection')){
            setVisible(true);
        }else{
            setVisible(false)
        }
    },[location])


    //showSearch - understood, visibile: from location, if only in collections page
  return showSearch && visible? (
    <div className = 'bg-gray-50 text-center'>
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-small' type="text" placeholder='search'></input>
        <img src={assets.search_icon} className='w-4'></img>
      </div>
      <img src={assets.cross_icon} className='inline w-3 cursor-pointer' onClick={()=>setShowSearch(false)}></img>
    </div>
  ):null
}

export default Searchbar
