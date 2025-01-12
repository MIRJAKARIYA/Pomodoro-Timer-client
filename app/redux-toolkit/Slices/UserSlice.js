const { createSlice, current } = require("@reduxjs/toolkit");

const initialState = {
  user: localStorage.getItem("loggedInUser") ? JSON.parse(localStorage.getItem("loggedInUser")):{},
  loading: true,
};

const Slice = createSlice({
  name: "addEmployeeSlice",
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
      // let empData = JSON.stringify(current(state.user));
      // localStorage.setItem("loggedInUser", empData);
    },
    removeUser: (state, action) => {
      state.user =action.payload;
      localStorage.removeItem("loggedInUser");
    },
  },
});

export const { addUser,removeUser } = Slice.actions;
export default Slice.reducer;
