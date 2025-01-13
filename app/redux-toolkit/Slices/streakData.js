const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// Initial state
const initialState = {
  streakData: {},
  loading: false,
  error: null,
};

// Create an async thunk to fetch data from the API
export const fetchStreakData = createAsyncThunk(
  'streakData/fetchStreakData', 
  async (id) => {
    const response = await fetch(`http://localhost:5000/api/current-longest-streaks/${id}`,{
      headers:{
        user_id:id
      }
    });  // Replace with your API endpoint
    if (!response.ok) throw new Error('Failed to fetch streak data');
    const {data} = await response.json()  
   
    return data?.[0]
  }
);

const Slice = createSlice({
  name: 'streakData',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.streakData = action.payload;  // Update streakData in the state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStreakData.pending, (state) => {
        state.loading = true;  // Set loading to true while the request is pending
      })
      .addCase(fetchStreakData.fulfilled, (state, action) => {
        state.loading = false;
        state.streakData = action.payload;  // Save the fetched data to streakData
      })
      .addCase(fetchStreakData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;  // Capture any error during the fetch
      });
  },
});

export const { addData } = Slice.actions;
export default Slice.reducer;
