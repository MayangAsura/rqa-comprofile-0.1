import { useNavigate } from 'react-router-dom';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Header from 'components/Headers/Header';

let initialState = {
    error: false,
    errorMessage: "",
    userInfo: null,
    userEmail: null,
    role: null,
    orgzInfo: {
      orgz_id: null,
      orgz_name: null
    },
    orgzId: null
}

const BASE_URL = process.env.REACT_APP_SERVER_MODE === 'development'? process.env.REACT_APP_LOCAL_SERVER_URL : process.env.REACT_APP_PROD_SERVER_URL
const LOCAL_URL = process.env.REACT_APP_LOCAL_URL

// const initialState = {
//   entities: [],
//   loading: false,
// }

export const login = createAsyncThunk(
  '/api/auth/login',
  async (payload, {rejectWithValue}) => {
    await axios.post(`${BASE_URL}/api/auth/login`, {username: payload.username, password: payload.password, role: payload.role})
          .then(result => {
            console.log('result', result.data.data, result.status)
            if(result.status === 200){
              console.log('in fulfilled')

              Cookies.set('token', result.data.data.token)

              toast.success('Berhasil, Login berhasil.')

              return result.data.data
            }else{
              console.log('in reject')
              toast.error('Gagal, Login gagal.')
              return rejectWithValue(result.data.data.error)
            }
            // if(result.status === 200){

            //   // Cookies.set('token', result.data.data.token)
            //   this.iniatialState.userInfo = {
            //     username: result.data.data.username,
            //     full_name: result.data.data.full_name,
            //   }
            //   this.initialState.orgzInfo.orgz_id= result.data.data.orgz_id
            //   this.initialState.orgzInfo.orgz_name= result.data.data.orgz_id
            //   //   ,
            //   //   org_name: result.data.data.orgz_name,
            //   // }
            //   // toast('Alhamdulillah, Anda berhasil login.')
            //   return result.data.data
            // }
          })
          .catch(error => {
            console.log('in error', error)
            toast.error('Gagal, Login gagal.')
            return rejectWithValue(error)
            // toast('Afwan, Error ketika login.')
            // this.state.error = true
            // this.state.errorMessage = 'Persist login error: ' + error

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
    // login_: (state, action) => {
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
    //           // toast('Alhamdulillah, Anda berhasil login.')
    //         }
    //       })
    //       .catch(error => {
    //         // console.log(error)
    //         // toast('Afwan, Error ketika login.')
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

        console.log('in logout action')
        state.userInfo = null
        state.orgzInfo = null
        state.userEmail = null
        state.role = null
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
        state.error = false
        console.log('action.payload', action)
        // // Cookies.set('token', action.payload.token)

        const token = Cookies.get('token')

        if(token){
          state.userInfo = {
            username: action.meta.arg.username,
            // full_name: action.meta.full_name,
          }
          state.userEmail = action.meta.arg.username
          state.role = action.meta.arg.role
        }
        // state.orgzInfo = {
        //   orgz_id: action.payload.orgz_id,
        //   org_name: action.payload.orgz_name,
        // }
        // state.orgzId = action.payload.orgz_id
      }
    )
    .addCase(
      login.rejected, (state, action) => {
        state.error = true
      }
    )
  }
});

export const {
  login_,
  logout,
  role,
  resetInfo,
  error,
  userInfo,
  orgzId,
  orgzInfo,
  userEmail
} = authSlice.actions;
export default authSlice.reducer;