import {
    LOGIN,
    LOGOUT,
    UPVOTED_SUBMISSIONS,
    THREADS,
    SUBMISSIONS,
    USER,
    HOME,
    NEWEST,
    UPVOTED_COMMENTS,
    ASK
} from "../actionTypes";

const initialState = {
    upvotedSubmissions: [],
    user: [],
    upvotedComments: [],
    submissions: [],
    threads: [],
    home: [],
    newest: [],
    ask: []
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case UPVOTED_SUBMISSIONS: {
            return Object.assign({}, state, {
                upvotedSubmissions: action.payload,
            });
        }
        case UPVOTED_COMMENTS: {
            return Object.assign({}, state, {
                upvotedComments: action.payload,
            });
        }
        case HOME: {
            return Object.assign({}, state, {
                home: action.payload,
            });
        }
        case NEWEST: {
            return Object.assign({}, state, {
                newest: action.payload,
            });
        }
        case THREADS: {
            return Object.assign({}, state, {
                threads: action.payload,
            });
        }
        case SUBMISSIONS: {
            return Object.assign({}, state, {
                submissions: action.payload,
            });
        }
        case LOGIN: {
            return Object.assign({}, state, {
                user: action.payload,
            });
        }
        case LOGOUT: {
            localStorage.removeItem("user_id");
            localStorage.removeItem("token");
            return Object.assign({}, state, {
                currentUser: [],
            });
        }
        case USER: {
            return Object.assign({}, state, {
                user: action.payload,
            });
        }
        case ASK: {
            return Object.assign({}, state, {
                ask: action.payload,
            });
        }
        default:
            return state;

    }

}
