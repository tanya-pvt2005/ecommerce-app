import React from 'react'
import {ShopContext} from "../context/ShopContext"
import { useContext, useState, useEffect} from 'react';
import { assets } from '../assets/frontend_assets/assets';
import Title from "../components/Title"
import ProductItem from "../components/ProductItem"
const Collection = () => {

  //first we need data of all products
  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false)
  // for mapping filtered products in webpage
  const [filterPdts, setFilterPdts] = useState([])
  
  //state var for different filtering
  const[category, setCategory] = useState([]) //categories filter
  const[subCategory, setSubCategory] = useState([]) //type filter

  const [sortType, setSortType] = useState('relevant') 

  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      //category is already there in the array
      //filter out
      setCategory(prev=>prev.filter(item=>item !== e.target.value))
    }
    else{
      setCategory(prev=> [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) =>{
    if(subCategory.includes(e.target.value)){
      //remove it : user is unchecking the checkbox
      setSubCategory(prev=> prev.filter(item => item!== e.target.value))
    }
    else{ //add it: user is checking the checkbox
      setSubCategory(prev=>[...prev, e.target.value])
    }
  }

  useEffect(()=>{
    setFilterPdts(products)
  },[])

  // useEffect(()=>{
  //   console.log(subCategory)
  // },[subCategory])


  //using category and subcategory variables => create one filter
  // also Filter products based on search query
  const applyFilter = () =>{
    let productsCopy = products.slice()
    if(showSearch && search){
      //use search to filter pdts
      productsCopy = productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0){
      //selected any category: added in category state
      productsCopy = productsCopy.filter(item=> category.includes(item.category))
    }
    if(subCategory.length>0){
      //selected any subCategory
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilterPdts(productsCopy)
  }

  //useEffect for filter
  useEffect(()=>{
    applyFilter();
  },[category, subCategory, search, showSearch])


  //Sorting Products
  const sortPdts = () =>{
    let filterPdtsCopy = filterPdts.slice()
    switch (sortType) {
      case 'low-high':
        setFilterPdts(filterPdtsCopy.sort((a,b)=>(a.price - b.price)))
        break;
      case 'high-low':
        setFilterPdts(filterPdtsCopy.sort((a,b)=>(b.price - a.price)))
        break;
  
      default:
        applyFilter()
        break;
    }
  }

  useEffect(()=>{
    sortPdts()
  },[sortType])






  return (
  
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* filter options */}
      <div className = 'min-w-60'>
        <p onClick = {()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src = {assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter?'rotate-90':''}`}></img>
        </p>
        {/* category filters */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6  ${showFilter ? '' : 'hidden sm:block'  }`}>
            <p className = 'mb-3 text-sm font-medium'>CATEGORIES</p>

            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

              <p className='flex gap-2'>
                <input type= 'checkbox' className='w-3' value = {'Men'} onChange = {toggleCategory}/>Men
              </p>
              <p className='flex gap-2'>
                <input type= 'checkbox' className='w-3' value = {'Women'} onChange = {toggleCategory}/>Women
              </p>
              <p className='flex gap-2'>
                <input type= 'checkbox' className='w-3' value = {'Kids'} onChange = {toggleCategory}/>Kids
              </p>
            </div>
        </div>
      {/* Subcategory filter */}
      <div className={`border border-gray-300 pl-5 py-3 my-5  ${showFilter ? '' : 'hidden sm:block'  }`}>
            <p className = 'mb-3 text-sm font-medium'>TYPE</p>

            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

              <p className='flex gap-2'>
                <input type= 'checkbox' className='w-3' value = {'Topwear'}  onChange = {toggleSubCategory}/>Topwear
              </p>
              <p className='flex gap-2'>
                <input type= 'checkbox' className='w-3' value = {'Bottomwear'}  onChange = {toggleSubCategory}/>Bottomwear
              </p>
              <p className='flex gap-2'>
                <input type= 'checkbox' className='w-3' value = {'Winterwear'}  onChange = {toggleSubCategory}/>Winterwear
              </p>
            </div>
        </div>
      </div>
      

      {/* Right Side */}
      <div className="flex-1">

        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1 = 'ALL' text2 = 'COLLECTIONS'/>
          {/* Product Sort */}
          <select onChange= {(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* Map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {/* map all the products */}
          {
             filterPdts.map((item, idx)=>{
              return <ProductItem key = {idx} name = {item.name} id={item._id} price = {item.price} image={item.image}/>
            })
          }
        </div>
      </div>

      
    </div>
  )
}

export default Collection
