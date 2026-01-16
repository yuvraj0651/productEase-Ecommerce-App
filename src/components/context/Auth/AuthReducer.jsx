export const initialState = {
    userData: [],
    isAuthenticated: false,
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                userData: action.payload,
                isAuthenticated: true,
            }
        case "LOGOUT":
            return {
                ...state,
                userData: [],
                isAuthenticated: false,
            }
        default:
            return state;
    }
};

export default AuthReducer;