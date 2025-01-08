import { configureStore } from '@reduxjs/toolkit';
import ListSlice from './slice/listSlice';


export const store = configureStore({
    reducer: {
        list: ListSlice,
    }
})


export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;