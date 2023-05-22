import { configureStore } from "@reduxjs/toolkit"
import { bodySlide } from "../components/body/bodySlide"
import { cartSlide } from "../components/cart/cartSlide"
import { adminSlide } from "../components/admin/adminSlide"
import { homeSlide } from "../components/home/homeSlide"
const store = configureStore({
    reducer:{
      listSp:bodySlide.reducer,
      cart:cartSlide.reducer,
      user:adminSlide.reducer,
      home:homeSlide.reducer
    }
})

export default store