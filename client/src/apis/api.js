import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8080/api/' }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (args) => ({ url: 'get-products' }),
      providesTags: (result, error, id) => {
        return ['products']
      },
    }),
    deleteProducts: builder.mutation({
      query: (args) => ({ url: 'delete-product',method:'POST',body:args }),
      invalidatesTags:['products'],
    }),
    addProduct: builder.mutation({
      query: (args) => ({ url: 'add-product',method:'POST',body:args }),
      invalidatesTags:['products'],
    }),
    updateProduct: builder.mutation({
      query: (args) => ({ url: 'update-product',method:'POST',body:args }),
      invalidatesTags:['products'],
    })
  }),
})
export default api
export const { useFetchProductsQuery,useDeleteProductsMutation,useAddProductMutation,useUpdateProductMutation } = api
