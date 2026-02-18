import { useNavigate } from 'react-router-dom';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const initialState = {
    error: false,
    errorMessage: "",
    userInfo: null,
    orgzInfo: null
}

const BASE_URL = process.env.REACT_APP_SERVER_MODE === 'development'? process.env.REACT_APP_LOCAL_URL : process.env.REACT_APP_PROD_URL

// const initialState = {
//   entities: [],
//   loading: false,
// }

export const login = createAsyncThunk(
  '/api/auth/login',
  async (data) => {
    await axios.post(`${BASE_URL}/api/auth/login`, data )
          .then(result => {
            console.log(result)
            if(result.status === 200){
              
              // Cookies.set('token', result.data.data.token)
              // state.userInfo = {
              //   username: result.data.data.username,
              //   full_name: result.data.data.full_name,
              // }
              // state.orgzInfo = {
              //   orgz_id: result.data.data.orgz_id,
              //   org_name: result.data.data.orgz_name,
              // }
              toast('Alhamdulillah, Anda berhasil login.')
              return result.data.data
            }
          })
          .catch(error => {
            // console.log(error)
            toast('Afwan, Error ketika login.')
            // state.error = true
            // state.errorMessage = 'Persist login error: ' + error

          })
    // const res = await fetch(`${BASE_URL}/api/auth/login`).then(
    //   (data) => data.json()
    // )
    // return res
})


// export const postSlice = createSlice({
//   name: 'posts',
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [getPosts.pending]: (state) => {
//       state.loading = true
//     },
//     [getPosts.fulfilled]: (state, { payload }) => {
//       state.loading = false
//       state.entities = payload
//     },
//     [getPosts.rejected]: (state) => {
//       state.loading = false
//     },
//   },
// })

// export const postReducer = postSlice.reducer
export const authSlice = createSlice({
  name: "authInfo",
  initialState,
  reducers: {
    // login: (state, action) => {
    //     axios.post(`${BASE_URL}'/api/auth/login'`, action.payload )
    //       .then(result => {
    //         if(result.status === 200){
    //           Cookies.set('token', result.data.data.token)
    //           state.userInfo = {
    //             username: result.data.data.username,
    //             full_name: result.data.data.full_name,
    //           }
    //           state.orgzInfo = {
    //             orgz_id: result.data.data.orgz_id,
    //             org_name: result.data.data.orgz_name,
    //           }
    //           toast('Alhamdulillah, Anda berhasil login.')
    //         }
    //       })
    //       .catch(error => {
    //         // console.log(error)
    //         toast('Afwan, Error ketika login.')
    //         state.error = true
    //         state.errorMessage = 'Persist login error: ' + error

    //       })
    // },
    register: async (state, action) => {
        await axios.post('/api/auth/register', action.payload )
          .then(result => {
            if(result.status === 200){
                // Cookies.set('token', result.data.data.token)
            //   state.userInfo = {
            //     username: result.data.data.username,
            //     full_name: result.data.data.full_name,
            //   }
            //   state.orgzInfo = {
            //     orgz_id: result.data.data.orgz_id,
            //     org_name: result.data.data.orgz_name,
            //   }

            }
          })
          .catch(error => {
            // console.log(error)
            state.error = true
            state.errorMessage = 'Persist login error: ' + error

          })
    },
    resetInfo: (state, action) => {
        state.userInfo = null
        state.orgzInfo = null
        Cookies.remove('token')
    },
    logout: (state, action) => {
        state.userInfo = null
        state.orgzInfo = null
        Cookies.remove('token')
    }
    // addToCart: async (state, action) => {
    //   await axios.get('/cart/add/' + action.payload._id)
    //       .then(result => {
    //         if(result.status === 200){
    //           const item = state.products.find(
    //             (item) => item._id === action.payload._id
    //           );
    //           if (item) {
    //                 item.quantity += action.payload.quantity;
    //           } else {
    //             state.products.push(action.payload);
    //           }

    //         }
    //       })
    //       .catch(error => {
    //         console.log(error)
    //       })
    // },
    // increaseQuantity: (state, action) => {
    //   const item = state.products.find(
    //     (item) => item._id === action.payload._id
    //   );
    //   if (item) {
    //     item.quantity++;
    //   }
    // },
    // drecreaseQuantity: (state, action) => {
    //   const item = state.products.find(
    //     (item) => item._id === action.payload._id
    //   );
    //   if (item.quantity === 1) {
    //     item.quantity = 1;
    //   } else {
    //     item.quantity--;
    //   }
    // },
    // deleteItem: (state, action) => {
    //   state.products = state.products.filter(
    //     (item) => item._id !== action.payload
    //   );
    // },
    // resetCart: (state) => {
    //   state.products = [];
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled, (state, action) => {
        console.log(action.payload)
        Cookies.set('token', action.payload.data.token)
        state.userInfo = {
          username: action.payload.data.username,
          full_name: action.payload.data.full_name,
        }
        state.orgzInfo = {
          orgz_id: action.payload.data.orgz_id,
          org_name: action.payload.data.orgz_name,
        }
      }
    )
  }
});

export const {
  resetInfo
} = authSlice.actions;
export default authSlice.reducer;