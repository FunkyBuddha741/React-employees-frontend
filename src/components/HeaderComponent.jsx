import { useState, useEffect } from 'react';
import React from 'react';
import { logOut, isUserLoggedIn } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
	const [isTrue, setIsTrue] = useState(false);

	useEffect(() => {
		setIsTrue(isUserLoggedIn());
	}, []);

	const navigate = useNavigate();

	const handleLogout = () => {
		logOut();
		setIsTrue(false);
		navigate('/login');
	};

	return (
		<div>
			<header>
				<nav className="navbar navbar-expand-md navbar-dark bg-dark">
					<div className="navbar-brand">Employee Management App</div>
					{isTrue && (
						<button className="btn btn-danger" onClick={() => handleLogout()}>
							Log out
						</button>
					)}
				</nav>
			</header>
		</div>
	);
};

export default HeaderComponent;
