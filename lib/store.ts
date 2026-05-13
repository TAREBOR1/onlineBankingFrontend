import { configureStore } from "@reduxjs/toolkit";
import uiSlice from '@/redux/uiSlice'


 const store= configureStore({
    reducer:{
        ui: uiSlice ,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>;