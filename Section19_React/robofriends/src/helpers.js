export const containsCaseInsensitive = (src, search) => {
	if (!src) {
		console.warn("Source string is not set. Returning false")
		return false;
	}
	
	//Return true if the search string is empty / undefined;
	return !search || src.toLowerCase().includes(search.toLowerCase());
}