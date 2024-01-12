import axios from 'axios';
import { useMemo, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';

const AUTH_REST_API_BASE = 'http://localhost:8080/api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useSessionStorage('user', null);
	const [token, setToken] = useSessionStorage('token', null);
	const [roles, setRoles] = useSessionStorage('roles', null);
	const navigate = useNavigate();

	// call this function when you want to authenticate the user
	const login = async (req) => {
		return await new Promise((resolve, reject) => {
			axios
				.post(`${AUTH_REST_API_BASE}/login`, req)
				.then((response) => {
					resolve(response);
				})
				.catch((err) => console.log(err));
		})
			.then((response) => {
				const token = 'Bearer ' + response.data.token;
				console.log(token);
				setToken(token);
				setUser(response.data.userName);
				setRoles(response.data.roles);
				navigate('/employees');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// call this function to sign out logged in user
	const logout = async () => {
		return await new Promise((resolve, reject) => {
			axios
				.post(`${AUTH_REST_API_BASE}/logout`)
				.then((response) => {
					resolve(response);
					setUser(null);
					sessionStorage.clear();
					navigate('/', { replace: true });
				})
				.catch((err) => console.log(err));
		});
	};

	const value = useMemo(
		() => ({
			user,
			login,
			logout,
		}),
		[user]
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};

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
	const token = JSON.parse(sessionStorage.getItem('token'));
	return token;
};

export const getUserRoles = () => {
	const roles = JSON.parse(sessionStorage.getItem('roles'));
	return roles;
};

export const saveLoggedInUser = (username) => {
	sessionStorage.setItem('user', username);
};

export const saveUserRoles = (roles) => {
	sessionStorage.setItem('roles', JSON.stringify(roles));
};

export const isUserLoggedIn = () => {
	const username = JSON.parse(sessionStorage.getItem('user'));
	console.log(typeof username);
	if (username === null) {
		return false;
	} else {
		return true;
	}
};

export const getLoggedInUser = () => {
	const username = sessionStorage.getItem('user');
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
