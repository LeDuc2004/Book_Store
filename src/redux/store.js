import { configureStore } from "@reduxjs/toolkit"
import { bodySlide } from "../components/body/bodySlide"
import { cartSlide } from "../components/cart/cartSlide"
import { adminSlide } from "../components/admin/adminSlide"
const store = configureStore({
    reducer:{
      listSp:bodySlide.reducer,
      cart:cartSlide.reducer,
      user:adminSlide.reducer
    }
})

export default store