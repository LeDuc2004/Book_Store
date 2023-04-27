import { configureStore } from "@reduxjs/toolkit"
import { bodySlide } from "../components/body/bodySlide"
const store = configureStore({
    reducer:{
      listSp:bodySlide.reducer
    }
})

export default store