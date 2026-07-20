// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// // const API_URL = "http://localhost:5000/api/auth";

// // export const signupUser = createAsyncThunk(
// //   "auth/signup",
// //   async ({ fullName, email, password }, {rejectWithValue}) => {
// //     try{
// //       const res = await fetch(`${API_URL}/signup`,{
// //         method: "POST",
// //         headers: {"Content-Type":"application/json"},
// //         body: JSON.stringify({ fullName, email, password })
// //       });
// //       const data = await res.json();
// //       if(!data.success) return rejectWithValue(data.message);
// //       localStorage.setItem("token",data.token);
// //       localStorage.setItem("currentUser",JSON.stringify(data.user));
// //       return data;
// //     }
// //     catch(err){
// //       return rejectWithValue("Server Error. Please Try Again.")
// //     }
// //   }
// // )

// // const initialState = {
// //   users: JSON.parse(localStorage.getItem("users")) || [],
// //   currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
// //   isAuthenticated: !!localStorage.getItem("currentUser"),
// //   error: null
// // };

// // // const authSlice = createSlice({
// // //   name: "auth",
// // //   initialState,
// // //   reducers: {
// // //     signup(state, action) {
// // //       const { email, password } = action.payload;

// // //       const exists = state.users.find(u => u.email === email);
// // //       if (exists) {
// // //         state.error = "User already exists";
// // //         return;
// // //       }

// // //       const newUser = { email, password };
// // //       state.users.push(newUser);

// // //       localStorage.setItem("users", JSON.stringify(state.users));
// // //       state.error = null;
// // //     },

// // //     login(state, action) {
// // //       const { email, password } = action.payload;

// // //       const user = state.users.find(
// // //         u => u.email === email && u.password === password
// // //       );

// // //       if (user) {
// // //         state.currentUser = user;
// // //         state.isAuthenticated = true;
// // //         localStorage.setItem("currentUser", JSON.stringify(user));
// // //         state.error = null;
// // //       } else {
// // //         state.error = "Invalid Email or Password";
// // //       }
// // //     },

// // //     logout(state) {
// // //       state.currentUser = null;
// // //       state.isAuthenticated = false;
// // //       localStorage.removeItem("currentUser");
// // //     }
// // //   }
// // // });


// // export const loginUser = createAsyncThunk(
// //   "auth/login",
// //   async ({ email, password }, { rejectWithValue }) => {
// //     try {
// //       const res = await fetch(`${API_URL}/login`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, password }),
// //       });
// //       const data = await res.json();
// //       if (!data.success) return rejectWithValue(data.message);
// //       localStorage.setItem("token", data.token);
// //       localStorage.setItem("currentUser", JSON.stringify(data.user));
// //       return data;
// //     } catch (err) {
// //       return rejectWithValue("Server error. Please try again.");
// //     }
// //   }
// // );


// // const authSlice = createSlice({
// //   name: "auth",
// //   initialState,
// //   reducers: {
// //     logout(state) {
// //       state.currentUser = null;
// //       state.token = null;
// //       state.isAuthenticated = false;
// //       state.error = null;
// //       localStorage.removeItem("token");
// //       localStorage.removeItem("currentUser");
// //     },
// //     clearError(state) {
// //       state.error = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(signupUser.pending, (state) => { state.loading = true; state.error = null; })
// //       .addCase(signupUser.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.currentUser = action.payload.user;
// //         state.token = action.payload.token;
// //         state.isAuthenticated = true;
// //         state.error = null;
// //       })
// //       .addCase(signupUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });

// //     // builder
// //     //   .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
// //     //   .addCase(loginUser.fulfilled, (state, action) => {
// //     //     state.loading = false;
// //     //     state.currentUser = action.payload.user;
// //     //     state.token = action.payload.token;
// //     //     state.isAuthenticated = true;
// //     //     state.error = null;
// //     //   })
// //     //   .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
// //   },
// // });
// // export const { signup, login, logout } = authSlice.actions;
// // export default authSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const API_URL = "http://localhost:5000/api/auth";

// // ── Async Thunks ──────────────────────────────────────────────

// export const signupUser = createAsyncThunk(
//   "auth/signup",
//   async ({ fullName, email, password }, { rejectWithValue }) => {
//     try {
//       const res = await fetch(`${API_URL}/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ fullName, email, password }),
//       });
//       const data = await res.json();
//       // if (!data.success) return rejectWithValue(data.message);
//       if (!res.ok) {
//    console.log(data);
//   //  return rejectWithValue(data.message);
//   return rejectWithValue(data.error || "Something went wrong");
//       }
// //       localStorage.setItem("token", data.token);  
// //       localStorage.setItem("currentUser", JSON.stringify(data.user));
//       return data;
//     } catch (err) {
//       return rejectWithValue("Server error. Please try again.");
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const res = await fetch(`${API_URL}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();
//       if (!data.success) return rejectWithValue(data.message);
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("currentUser", JSON.stringify(data.user));
//       return data;
//     } catch (err) {
//       return rejectWithValue("Server error. Please try again.");
//     }
//   }
// );

// // ── Slice ─────────────────────────────────────────────────────
// const token = localStorage.getItem("token");
// const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

// const initialState = {
//   currentUser: currentUser,
//   token: token,
//   isAuthenticated: !!token,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout(state) {
//       state.currentUser = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.error = null;
//       localStorage.removeItem("token");
//       localStorage.removeItem("currentUser");
//     },
//     clearError(state) {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signupUser.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(signupUser.fulfilled, (state) => {
//         state.loading = false;
//         state.currentUser = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(signupUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });

//     builder
//       .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(loginUser.fulfilled, (state) => {
//         state.loading = false;
//         state.currentUser = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
//   },
// });

// export const { logout, clearError } = authSlice.actions;
// // Legacy aliases so existing components work unchanged

// export const login = loginUser;
// export const signup = signupUser;
// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/auth";

// =========================
// Signup
// =========================
export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ fullName, email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Something went wrong");
      }

      return data;
    } catch (err) {
      return rejectWithValue("Server error. Please try again.");
    }
  }
);

// =========================
// Login
// =========================
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      return data;
    } catch (err) {
      return rejectWithValue("Server error. Please try again.");
    }
  }
);

// =========================
// Initial State
// =========================
const token = localStorage.getItem("token");
const currentUser = JSON.parse(
  localStorage.getItem("currentUser") || "null"
);

const initialState = {
  currentUser,
  token,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

// =========================
// Slice
// =========================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.currentUser = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // Signup
      // =========================
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;

        // User must verify email before login
        state.currentUser = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // Login
      // =========================
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export const login = loginUser;
export const signup = signupUser;

export default authSlice.reducer;