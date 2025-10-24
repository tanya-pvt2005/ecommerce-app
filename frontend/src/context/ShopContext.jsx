import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";

//Context lets you share data globally across your component tree without passing props manually at every level.
//Has 3 main parts: createContext, Provider function, useContext
export const ShopContext = createContext();

//context provider function
const ShopContextProvider = (props) =>{

    const currency = '$'
    const delivery_fee = 10

    const value = {
        products, currency, delivery_fee

    }
    return (
        <ShopContext.Provider value = {value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
