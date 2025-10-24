import React, { useContext} from 'react'
import { useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {

  const {products} = useContext(ShopContext)
  const [latestPdts, setLatestPdts] = useState([])
  //we component gets loaded, we need to put 10 pdts from products into array, we use useEffect and dependency array
  useEffect(()=>{
    setLatestPdts(products.slice(0,10))
  },[])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>

        {/* sending normal props */}
        <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam itaque oue?
        </p>
      </div>

      {/* for latest collection, we need 10 latest collections, we store them in a state variable. */}
      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            latestPdts.map((item, index)=>{
                return <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            })
        }
      </div>


    </div>
  )
}

export default LatestCollection
