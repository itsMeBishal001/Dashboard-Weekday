// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//   },
//   reducers: {
//     addItem: (state, action) => {
//       state.items.push(action.payload);
//     },
//     removeItem: (state, action) => {
//       state.items.pop();
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const { addItem, removeItem, clearCart } = cartSlice.actions;

// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  offset: 0,
  jobTypeFilter: "",
  locationFilter: "",
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setJobTypeFilter: (state, action) => {
      state.jobTypeFilter = action.payload;
    },
    setLocationFilter: (state, action) => {
      state.locationFilter = action.payload;
    },
  },
});

export const { setJobs, setOffset, setJobTypeFilter, setLocationFilter } =
  jobsSlice.actions;

export default jobsSlice.reducer;
