import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from "../components/Title"
import ProductItem from './ProductItem'

const RelatedProducts = ({category, subCategory}) => {

    //display using existing pdt category and subcategory
    const {products} = useContext(ShopContext)
    const [related, setRelated] = useState([])

    useEffect(()=>{
        if(products.length>0){
            
            let pdtCopy = products.slice();
            // console.log(pdtCopy)

            //filter pdtCopy
            pdtCopy = pdtCopy.filter((item)=>(category === item.category ))
            // console.log(pdtCopy)
            pdtCopy = pdtCopy.filter((item)=>(subCategory === item.subCategory))
            // console.log(pdtCopy)

            setRelated(pdtCopy.slice(0,5))

            // console.log(setRelated)
        }
    },[products])
            


  return (
    <div className='my-24'>
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS"/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item, idx)=>{
            return <ProductItem key = {idx} id={item._id} name={item.name} price={item.price} image={item.image}></ProductItem>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
