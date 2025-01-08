import { createSlice } from "@reduxjs/toolkit";
import { Info, newsApi } from "../../api/api";
import { createAppAsyncThunk } from "../../hooks/hooks";

const fetchGetList = createAppAsyncThunk<number[], undefined>('list/fetchGetList', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
        const { data } = await newsApi.getList();
        return data.slice(0, 100);
    } catch (e) {
        const error = e as { message: string }
        return rejectWithValue(error.message)
    }

})
const fetchGetInfo = createAppAsyncThunk<Info, number>('list/fetchGetInfo', async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
        const { data } = await newsApi.getInfo(id);
        return data;
    } catch (e) {
        const error = e as { message: string }
        return rejectWithValue(error.message)
    }

})

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
    data: null as number[] | null,
    info: null as Info[] | null,
    //comments: [],
    status: 'idle' as RequestStatusType,
    error: null as string | null,
}

const ListSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        // cleverComments: (state, action) => {
        //     state.comments = [];
        // }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchGetList.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            // .addCase(fetchGetListRefresh.fulfilled, (state, action) => {
            //     if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
            //         state.data = action.payload;
            //     }
            // })
            .addCase(fetchGetInfo.fulfilled, (state, action) => {
                console.log('dsbcjscb');

                if (action.payload && action.payload.id) {
                    if (!state.info) state.info = [];
                    if (!state.info.find(item => item.id === action.payload.id)) {
                        state.info.push(action.payload);
                    }
                    state.info.sort((a, b) => b.time - a.time);
                    if (state.info.length > 100) {
                        state.info = state.info.slice(0, 100);
                    }
                }
            })
        // .addCase(fetchGetInfo.rejected, (state, action) => {
        //     state.status = 'error';
        //     state.error = action.payload;
        // })
        // .addCase(fetchGetInfoAboutComments.pending, (state, action) => {
        //     state.status = 'loading';
        // })
        // .addCase(fetchGetInfoAboutComments.fulfilled, (state, action) => {
        //     state.status = 'succeeded';
        //     const {id} = action.payload;
        //     if(state.comments.every(item => item.id !== id))state.comments.push(action.payload);

        // })

    }
})
//export const {cleverComments} = ListSlice.actions;
export {
    fetchGetList,
    //fetchGetListRefresh,
    fetchGetInfo,
    //fetchGetInfoAboutComments
};
export default ListSlice.reducer;