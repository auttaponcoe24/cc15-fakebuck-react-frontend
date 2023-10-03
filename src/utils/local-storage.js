const ACCESS_TOKEN = "ACCESS_TOKEN";

export const addAccessToken = (token) =>
	localStorage.setItem(ACCESS_TOKEN, token); //create
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN); //read
export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN); //remove
