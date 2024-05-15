import React, { useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { useAuth, getToken } from './AuthService';

const parseJwt = (token) => {
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return null;
	}
};

const AuthVerify = () => {
	const auth  = useAuth(); 
	let location = useLocation();
	let navigate = useNavigate();
	

	useEffect(() => {
		const user = JSON.parse(sessionStorage.getItem('user'));

		if (user) {
			const decodedJwt = parseJwt(getToken());
			console.log(decodedJwt, 'inside auth verify');
			if (decodedJwt.exp * 1000 < Date.now()) {
				console.log('logging out!')
				// auth.logout();
				navigate('/login');	
			}
		}
	}, [location, auth]);
	return;
};

export default AuthVerify;
