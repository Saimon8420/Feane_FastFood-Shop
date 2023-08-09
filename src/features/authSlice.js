import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
    login: [],
    register: [],
    orders: [],
    loginError: [],
    loginSuccess: [],
    registerError: [],
    registerSuccess: [],
    orderSuccess: [],
    updateSuccess: [],
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            console.log("actionPayload:", action.payload);
            // const register = current(state.register);
            const exists = state.register.find(users => users.userId === action.payload.userId);
            console.log("user exist:", exists)
            if (exists) {
                const allUpdatedUser = state.register.map(users => users.userId === action.payload.userId ? { ...exists, name: action.payload.name, email: action.payload.email, password: action.payload.password, phone: action.payload.phone, address: action.payload.address } : users);

                console.log("updated user:", allUpdatedUser);
                state.register = allUpdatedUser;
                state.login = [action.payload];
                state.updateSuccess = ["User updated Successfully"];
            }
        },
        loginUser: (state, action) => {
            // const register = current(state.register);
            const matchedUser = state.register.find((each) => (each.email === action?.payload?.email && each.password === action?.payload?.password));
            if (matchedUser) {
                state.login = [matchedUser];
                state.loginError = [];
                state.loginSuccess = ["Login successful"];
                state.registerError = [];
                state.registerSuccess = [];
            }
            else {
                state.loginError = ["Wrong Email/Password"];
                state.loginSuccess = [];
                state.registerError = [];
                state.registerSuccess = [];
            }
        },
        registerUser: (state, action) => {
            console.log(action);
            const id = Date.now();

            if (state.register.length === 0) {
                state.register = [{ ...action?.payload, userId: id }];
                state.registerSuccess = ["User successfully created"]
                state.registerError = [];
                state.loginSuccess = [];
                state.loginError = [];
            }
            else {
                // const register = current(state.register);
                const matchedUser = state.register.find((each) => each.email.includes(action?.payload?.email));
                console.log(matchedUser);
                if (!matchedUser) {
                    state.register = [...state.register, { ...action?.payload, userId: id }];
                    state.registerSuccess = ["User successfully created"];
                    state.loginSuccess = [];
                    state.loginError = [];
                    state.registerError = [];
                }
                else {
                    state.registerSuccess = [];
                    state.registerError = ["This user exists,please login"];
                    state.loginSuccess = [];
                    state.loginError = [];
                }
            }
        },
        orders: (state, action) => {
            if (!state.orders) {
                state.orders = [...action?.payload];
                state.orderSuccess = [];
                state.orderSuccess = ["Order successfully placed"];
            }
            else {
                state.orders = [...state.orders, ...action?.payload];
                state.orderSuccess = [];
                state.orderSuccess = ["Order successfully placed"];
            }
        },
        logoutUser: (state) => {
            state.login = [];
            state.loginError = [];
            state.loginSuccess = [];
            state.registerError = [];
            state.registerSuccess = [];
            state.orderSuccess = [];
            state.updateSuccess = [];
        }
    }
})

export const { loginUser, registerUser, orders, updateProfile, logoutUser } = authSlice.actions;
export default authSlice.reducer;