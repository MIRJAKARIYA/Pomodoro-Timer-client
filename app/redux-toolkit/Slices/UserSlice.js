const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  user: {},
  loading: true,
};
if (typeof window !== "undefined" && localStorage.getItem("loggedInUser")) {
  initialState.user = JSON.parse(localStorage.getItem("loggedInUser"));
}
const Slice = createSlice({
  name: "addUserSlice",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const data = {
        _id: action.payload._id,
        nme: action.payload.name,
        email: action.payload.email,
        avatar_url: action.payload.avatar_url,
      };
      
      state.user = data;

    },
    removeUser: (state, action) => {
      state.user =action.payload;
      localStorage.removeItem("loggedInUser");
    },
    setInitialData:(state,action)=>{
      state.user = action.payload
    },
  },
});

export const { addUser,removeUser,setInitialData } = Slice.actions;
export default Slice.reducer;
