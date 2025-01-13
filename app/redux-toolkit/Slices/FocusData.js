const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// Initial state
const initialState = {
  focusData: {},
  loading: false,
  error: null,
};
export const fetchFocusData = createAsyncThunk(
  'focusData/fetchFocusData',
  async (id) => {
    
    const response = await fetch(`http://localhost:5000/api/focus-session/${id}`,{
        headers:{
            user_id:id
        }
    }); 
    if (!response.ok) throw new Error('Failed to fetch focus data');
   const {data} = await response.json()  
   
    return data?.[0]
  }
);

const Slice = createSlice({
  name: 'focusData',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.focusData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFocusData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFocusData.fulfilled, (state, action) => {
        state.loading = false;
        state.focusData = action.payload;
      })
      .addCase(fetchFocusData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addData } = Slice.actions;
export default Slice.reducer;
