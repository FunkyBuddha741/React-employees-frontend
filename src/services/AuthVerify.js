import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth, getToken } from './AuthService';

const parseJwt = (token) => {
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return null;
	}
};

const AuthVerify = () => {
	const { auth } = useAuth();
	let location = useLocation();

	useEffect(() => {
		const user = JSON.parse(sessionStorage.getItem('user'));

		if (user) {
			const decodedJwt = parseJwt(getToken());
			console.log(decodedJwt, 'inside auth verify');
			if (decodedJwt.exp * 1000 < Date.now()) {
				auth.logout();
			}
		}
	}, [location, auth]);
	return;
};

export default AuthVerify;
