import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

//Context lets you share data globally across your component tree without passing props manually at every level.
//Has 3 main parts: createContext, Provider function, useContext
export const ShopContext = createContext();

//context provider function
const ShopContextProvider = (props) =>{

    const currency = '$'
    const delivery_fee = 10
    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    //for add to cart functionality
    const [cartItems, setCartItems] = useState({})
    const navigate = useNavigate(); //hook

    // --------------------------------------------------------------------------------------------------------------
    //arrow function with name add to cart
    const addToCart = async(itemId, size)=>{
        //selected size and pdt added to cart
        if(!size){
            toast.error('Select Product Size')
            return
        }
        let cartData = structuredClone(cartItems) //create copy of cartItems
        console.log(cartData)
        //checks if item exists in the cart
        if(cartData[itemId]){
            //checks if ussi size ka pehle exist krta h
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1
            }
            else{
                cartData[itemId][size]=1;
            }
        }else{
            //create a newc entry of the product
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)
    }

    useEffect(()=>{
        console.log(cartItems)
    },[cartItems])


    //get cart count
    const getCartCount = ()=>{
        let totalCount = 0;
        for(const itemId in cartItems){
            for(const size in cartItems[itemId]){
                try{
                    const quantity = cartItems[itemId][size];
                    if(quantity>0){
                        totalCount+=quantity
                    }
                }catch(error){
                    console.log(error)
                }
            }
        }
        return totalCount
    }


    //clear cartData or modify cartItems
    const updateQuantity = async(itemId, size, quantity)=>{

        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity
        setCartItems(cartData);

    }

    //get cart amount
    const getCartAmount = () =>{
        let count = 0;
        for(const items in cartItems){
            //to get the product price
            let itemInfo = products.find((product)=> product._id === items)
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        count += itemInfo.price * cartItems[items][item]
                    }
                }catch(error){
                    console.log(error)
                }
            }
        }

        return count;
    } 

    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, addToCart, getCartCount, cartItems, updateQuantity, getCartAmount, navigate

    }
    return (
        <ShopContext.Provider value = {value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
