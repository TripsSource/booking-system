import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { initialStateType } from "@/types/store/products";
import { ProductDetailState } from "@/types/app/product";
import errorHandler from "@/utils/errorHandler";
import {
  createProduct,
  deleteProduct,
  getProductId,
  getProducts,
  handleLiveStatus,
  updateProduct,
} from "@/store/products/index.api";

const initialState: initialStateType = {
  products: [],
  product: {} as ProductDetailState,
  loading: false,
  productLoading: false,
};

export const crateProductAction = createAsyncThunk(
  "/product/create",
  errorHandler(createProduct)
);

export const updateProductAction = createAsyncThunk(
  "/product/update",
  errorHandler(updateProduct)
);

export const getProductsAction = createAsyncThunk(
  "/products/read/all",
  errorHandler(getProducts)
);

export const getProductIdAction = createAsyncThunk(
  "/product/read",
  errorHandler(getProductId)
);

export const deleteProductAction = createAsyncThunk(
  "/product/delete",
  errorHandler(deleteProduct)
);

export const handleLiveStatusAction = createAsyncThunk(
  "/product/liveStatus",
  errorHandler(handleLiveStatus)
);

const ProductsReducers = createSlice({
  name: "ProductsReducers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(crateProductAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(crateProductAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(crateProductAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateProductAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateProductAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProductsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
      })
      .addCase(getProductsAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProductIdAction.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(getProductIdAction.fulfilled, (state, action) => {
        state.product = action.payload;
        state.productLoading = false;
      })
      .addCase(getProductIdAction.rejected, (state) => {
        state.productLoading = false;
      });
  },
});

export const productsState = (state: RootState) =>
  state.ProductReducers.products;
export const productIdState = (state: RootState) =>
  state.ProductReducers.product;
export const productLoadingState = (state: RootState) =>
  state.ProductReducers.loading;
export const productIdLoadingState = (state: RootState) =>
  state.ProductReducers.loading;

export default ProductsReducers.reducer;
