import { CHANGE_SEARCH_FIELD,
	RETRIEVE_ROBOTS_PENDING,
	RETRIEVE_ROBOTS_SUCCESS,
	RETRIEVE_ROBOTS_FAILED
} from "./constants";

export const setSearchField = (text) => {
	return {
		type: CHANGE_SEARCH_FIELD,
		payload: text
	}
};

export const retrieveRobots = () => (dispatch) => {
	dispatch({type: RETRIEVE_ROBOTS_PENDING});
	fetch("https://jsonplaceholder.typicode.com/users")
		.then((response) => response.json())
		.then((data) => {
			return dispatch({type: RETRIEVE_ROBOTS_SUCCESS, payload: data});
		})
		.catch((err) => {
			return dispatch({type: RETRIEVE_ROBOTS_FAILED, payload: err});
		});
}