import axios from 'axios';

const AUTH_REST_API_BASE = 'http://localhost:8080/api/auth';

export const registerAPICall = (req) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${AUTH_REST_API_BASE}/register`, req)
			.then((response) => {
				resolve(response);
			})
			.catch((err) => reject(err));
	});
};

export const loginAPICall = (req) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${AUTH_REST_API_BASE}/login`, req)
			.then((response) => {
				resolve(response);
			})
			.catch((err) => reject(err));
	});
};

export const storeToken = (token) => {
	localStorage.setItem('token', token);
};

export const getToken = () => {
	const token = localStorage.getItem('token');
	return token;
};

export const saveLoggedInUser = (username) => {
	sessionStorage.setItem('authenticatedUser', username);
};

export const isUserLoggedIn = () => {
	const username = sessionStorage.getItem('authenticatedUser');

	if (username === null) return false;
	else return true;
};

export const getLoggedInUser = () => {
	const username = sessionStorage.getItem('authenticatedUser');
	return username;
};

export const logOut = () => {
	localStorage.clear();
	sessionStorage.clear();
};
