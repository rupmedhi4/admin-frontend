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

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                apiAgent.createProduct,
                data,
                { withCredentials: true }
            );
            console.log(res);
            return res.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getMyProducts = createAsyncThunk(
    'product/getMyProducts',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                apiAgent.getMyProducts,
                { withCredentials: true }
            )
            return res.data.products

        } catch (error) {
            rejectWithValue(error)
        }
    }
)
export const updateProducts = createAsyncThunk(
    'product/updateProducts',
    async ({ updatedData, editId }, { getState, rejectWithValue }) => {
        try {

            const res = await axios.put(
                `${apiAgent.updateProducts}/${editId}`,
                updatedData,
                { withCredentials: true }
            )
            return res.data.product

        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }

    }
)


const productsSlice = createSlice({
    name: 'products/slice',
    initialState: {
        loading: false,
        error: null,
        isFormOpen: false,
        isEdit: false,
        editId: null,
        totalCreateProducts: [],
        totalOrderedProducts: [],
        totalMyProducts: [],
    },
    reducers: {
        setIsFormOpen: (state) => {
            state.isFormOpen = !state.isFormOpen
        },
        setIsEdit: (state) => {
            state.isEdit = !state.isEdit
        },
        setEditId: (state, action) => {
            state.editId = action.payload
        },
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

            //createProduct
            .addCase(createProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false,
                    state.totalCreateProducts = action.payload
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            //getMyProducts
            .addCase(getMyProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(getMyProducts.fulfilled, (state, action) => {
                state.loading = false,
                    state.totalMyProducts = action.payload
            })
            .addCase(getMyProducts.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            //updateProducts
            .addCase(updateProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProducts.fulfilled, (state, action) => {
                state.loading = false
                const updatedProduct = action.payload
                state.totalMyProducts = state.totalMyProducts.map((product) =>
                    product._id === updatedProduct._id ? updatedProduct : product
                )
            })

            .addCase(updateProducts.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

    }
})


export const { setIsFormOpen, setIsEdit, setEditId } = productsSlice.actions
export default productsSlice.reducer