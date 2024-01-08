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

export const getUserRoles = () => {
	const roles = JSON.parse(sessionStorage.getItem('roles'));
	return roles;
};

export const saveLoggedInUser = (username) => {
	sessionStorage.setItem('authenticatedUser', username);
};

export const saveUserRoles = (roles) => {
	sessionStorage.setItem('roles', JSON.stringify(roles));
};

export const isUserLoggedIn = () => {
	const username = sessionStorage.getItem('authenticatedUser');
	console.log(username);

	if (username === null) {
		return false;
	} else return true;
};

export const getLoggedInUser = () => {
	const username = sessionStorage.getItem('authenticatedUser');
	return username;
};

export const logOut = () => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${AUTH_REST_API_BASE}/logout`)
			.then((response) => {
				resolve(response);
				localStorage.clear();
				sessionStorage.clear();
			})
			.catch((err) => reject(err));
	});
};
