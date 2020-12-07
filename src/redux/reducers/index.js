import {LOGIN, LOGOUT, UPVOTED_SUBMISSIONS} from "../actionTypes";

const initialState = {
    upvotedSubmissions: [],
    currentUser: [],
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case UPVOTED_SUBMISSIONS: {
            return Object.assign({}, state, {
                upvotedSubmissions: action.payload,
            });
        }
        case LOGIN: {
            localStorage.setItem('user_id', action.payload.id);
            localStorage.setItem('token', action.payload.token);
            return Object.assign({}, state, {
                currentUser: action.payload,
            });
        }
        case LOGOUT: {
            localStorage.removeItem('user_id');
            localStorage.removeItem('token');
            return Object.assign({}, state, {
                currentUser: [],
            });
        }
        default:
            return state;
    }
}