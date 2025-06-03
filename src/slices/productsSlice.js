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

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (productId, { rejectWithValue }) => {
        try {

            const response = await axios.delete(
                `${apiAgent.deleteProducts}/${productId}`,
                { withCredentials: true }
            );

            console.log('Delete product response:', response);
            return response

        } catch (error) {
            console.error('Delete product error:', error)
            return rejectWithValue(error.response || "Something went wrong");
        }
    }
);

export const getAllCreateProducts = createAsyncThunk(
    'product/getAllCreateProducts',
    async (_, { rejectWithValue }) =>{
        try {
            const res = await axios.get(
                apiAgent.getCreateProducts,
                { withCredentials: true }
            )
            return res.data.products
        } catch (error) {
            return rejectWithValue(error)
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
                state.totalMyProducts.unshift(action.payload.data); 
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

            //deleteProduct
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false
                const deletedId = action.meta.arg;
                state.totalMyProducts = state.totalMyProducts.filter(
                    (product) => product._id !== deletedId
                );
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            //getAllCreateProducts
            .addCase(getAllCreateProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllCreateProducts.fulfilled, (state, action) => {
                state.loading = false
                state.totalMyProducts = action.payload
            })
            .addCase(getAllCreateProducts.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload
            })

    }
})


export const { setIsFormOpen, setIsEdit, setEditId } = productsSlice.actions
export default productsSlice.reducer