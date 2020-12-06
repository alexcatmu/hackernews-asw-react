import {UPVOTED_SUBMISSIONS} from "../actionTypes";

const initialState = {
   upvotedSubmissions: []
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case UPVOTED_SUBMISSIONS: {
            return Object.assign({}, state, {
                upvotedSubmissions: action.payload,
            });
        }
        default:
            return state;
    }
}