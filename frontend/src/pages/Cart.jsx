import React, { useContext,useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {

  const {currency, products, cartItems,updateQuantity, navigate} = useContext(ShopContext)

  //changing data into array format
  const [cartData, setCartData] = useState([])

   useEffect(() => {
    const tempData = []
    
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item, // size of the cloth: S, M, L etc
            quantity: cartItems[items][item]
          })
        }
      }
    }

    setCartData(tempData)
    // console.log("Cart Data:", tempData) // Just console log, no state update
  }
  , [cartItems])


  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1='Your' text2='Cart'></Title>
      </div>
      <div>
        {
          cartData.map((item,idx)=>{
            const productData = products.find((product)=>product._id === item._id)
            return (
              <div key = {idx} className='py-4 border-t bprder-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src = {productData.image[0]}></img>
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                  </div>

                  <input onChange={(e)=>e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} type= 'number' min={1} className='border border-gray-400 max-w-20 px-1 sm:px-2' defaultValue={item.quantity}></input>
                  {/* bin icon to remove the image */}
                  <img onClick = {()=>updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon}></img>
              </div>
            )
          })
        }
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal/>
          <div className="w-full text-end">
            <button onClick = {()=>navigate('/place-order')} className='bg-black cursor-pointer text-white text-sm my-8 py-3 px-8'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
