import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  //get product id -> useParams hook; name should be same as /:pid in App.jsx
  const {pid} = useParams();
  // console.log(pid)

  // display p info using this pid
  //get all p data first
  const {products, currency} = useContext(ShopContext)
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')//store first image
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.map((item)=>{
      if(item._id === pid){
        setProductData(item)
        console.log(item)
        setImage(item.image[0])
        return null
      }
    })
  }
    //run when component gets loaded
    useEffect(()=>{
      fetchProductData();
    },[pid])
  
  return productData? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*-------------------- product data -------------------------*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* -------------------------Product Images----------------------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal">
            {
              productData.image.map((item, idx)=>{
                return <img src = {item} key={idx} className='w-[25%] sm:w-60 sm:mb-3 flex-shrink-0 cursor-pointer' onClick={()=>setImage(item)}></img>
              })
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img src = {image} className='w-full h-auto'></img>
          </div>
        </div>
            {/* --------------------product info------------------- */}
            <div className="flex-1">
              <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
              <div className="flex item-center gap-1 mt-2">
                <img src={assets.star_icon} alt="" className="w-5" />
                <img src={assets.star_icon} alt="" className="w-5" />
                <img src={assets.star_icon} alt="" className="w-5" />
                <img src={assets.star_icon} alt="" className="w-5" />
                <img src={assets.star_dull_icon} alt="" className="w-5" />
                {/* <p className='pl-2'>(122)</p> */}
                <p className='pl-2'>(122)</p>
              </div>
              <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
              <p className='mt-5 text-gray-500 md:w-4/5 font-medium'>{productData.description}</p>
              <div className="flex flex-col gap-4 my-8">
                <p>Select Size</p>
                <div className='flex gap-2'>
                  {productData.sizes.map((item, idx)=>{
                    return <button className={`border border-gray-200 py-2 px-4 bg-gray-100 cursor-pointer ${item === size ? 'border-orange-500' : ''}`} onClick = {()=>setSize(item)} key={idx}>{item}</button>
                  })}
                </div>
              </div>
              <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
              <hr className='mt-8 sm:w-4/5'></hr>
              <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p>100% Original Product</p>
                <p>Cash on Delievery Available</p>
                <p>Easy return and exchange policy in 7 days</p>
              </div>
            </div>
      </div>

      {/* ---------Description and Review Section-------------------- */}
      <div className = 'mt-20'>
        <div className='flex'>
          <b className='border border-gray-200 px-5 py-3 text-sm'>Description</b>
          <p className='border border-gray-200 px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col border border-gray-200 gap-4 border text-gray-700 px-6 py-6 text-sm'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem mollitia obcaecati soluta reprehenderit similique dignissimos culpa sint exercitationem non. Asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptas officiis eligendi reiciendis quis enim aperiam eum, necessitatibus nihil, corrupti temporibus molestiae explicabo facere, accusamus dolorem voluptate unde a assumenda!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem mollitia obcaecati soluta reprehenderit similique dignissimos culpa sint exercitationem non. Asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptas officiis eligendi reiciendis quis enim aperiam eum, necessitatibus nihil, corrupti temporibus molestiae explicabo facere, accusamus dolorem voluptate unde a assumenda!</p>
        </div>
      </div>

      {/* ------------Related Products------------------ */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ):<div className='opacity-0'></div>
}

export default Product
