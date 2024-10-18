import { configureStore } from "@reduxjs/toolkit"
import cartSlice from './slice/cartSlice.js'
import productSlice from './slice/productSlice.js'
import wishlistSlice from './slice/wishlistSlice.js'
const cartStore = configureStore({
 reducer:{
    productReducer:productSlice,
    wishlistReducer:wishlistSlice,
    cartReducer:cartSlice
 }
})
export default cartStore