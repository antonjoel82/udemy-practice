import { CHANGE_SEARCH_FIELD,
				 RETRIEVE_ROBOTS_PENDING,
				 RETRIEVE_ROBOTS_SUCCESS,
				 RETRIEVE_ROBOTS_FAILED
				 } from "./constants";

const initialSearchState = {
	searchField: ""
}

export const searchRobots = (state=initialSearchState, action={}) => {
	switch(action.type) {
		case CHANGE_SEARCH_FIELD:
			return Object.assign({}, state, {searchField: action.payload});
			//Could do this instead: return {...state, {searchField: action.payload}};
		default:
			return state;
	}
}

const initialRetrievalState = {
	isPending: true,
	robots: []
};

export const retrieveRobots = (state=initialRetrievalState, action={}) => {
	switch (action.type) {
		case RETRIEVE_ROBOTS_PENDING:
			return Object.assign({}, state, {isPending: true});
		case RETRIEVE_ROBOTS_SUCCESS:
			return Object.assign({}, state, {isPending: false, robots: action.payload});
		case RETRIEVE_ROBOTS_FAILED:
		return Object.assign({}, state, {error: action.payload});
		default:
			return state;
	}
}