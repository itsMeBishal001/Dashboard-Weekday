// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   jobs: [],
//   offset: 0,
//   jobTypeFilter: "",
//   locationFilter: "",
// };

// const jobSlice = createSlice({
//   name: "jobs",
//   initialState,
//   reducers: {
//     setJobs(state, action) {
//       state.jobs = action.payload;
//     },
//     setOffset(state, action) {
//       state.offset = action.payload;
//     },
//     setJobTypeFilter(state, action) {
//       state.jobTypeFilter = action.payload;
//     },
//     setLocationFilter(state, action) {
//       state.locationFilter = action.payload;
//     },
//   },
// });

// export const { setJobs, setOffset, setJobTypeFilter, setLocationFilter } =
//   jobSlice.actions;

// export default jobSlice.reducer;
import { configureStore } from "@reduxjs/toolkit";
import jobsSlice from "./jobsSlice";
const store = configureStore({
  reducer: {
    jobs: jobsSlice,
  },
});

export default store;
