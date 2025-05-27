import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiAgent } from '../apiAgent'
import axios from 'axios'

export const getOrderDetails = createAsyncThunk(
    'order/getOrderDetails',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${apiAgent.getOrderedProducts}`,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            console.log(error);

            return rejectWithValue(error)
        }
    }
)

const productsSlice = createSlice({
    name: 'products/slice',
    initialState: {
        loading: false,
        error: null,
        totalCreateProducts: [],
        totalOrderedProducts: [],
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrderDetails.pending, (state) => {
                state.loading = true
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.loading = false,
                state.totalOrderedProducts = action.payload
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload
            })

    }
})


export const { } = productsSlice.actions
export default productsSlice.reducer