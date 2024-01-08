import React, { useState } from 'react';
import {
	loginAPICall,
	storeToken,
	saveLoggedInUser,
	saveUserRoles,
} from '../services/AuthService';
import { useNavigate, Link } from 'react-router-dom';

const LoginComponent = () => {
	const [user, setUser] = useState({ usernameOrEmail: '', password: '' });

	const navigator = useNavigate();

	const handleLoginForm = (e) => {
		e.preventDefault();

		loginAPICall(user)
			.then((response) => {
				const token = 'Bearer ' + response.data.token;
				storeToken(token);
				saveLoggedInUser(user.usernameOrEmail);
				saveUserRoles(response.data.roles);
				navigator('/employees');

				window.location.reload(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="container">
			<br /> <br />
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<div className="card">
						<div className="card-header">
							<h2 className="text-center"> Login Form </h2>
						</div>

						<div className="card-body">
							<form>
								<div className="row mb-3">
									<label className="col-md-3 control-label">
										Username or Email
									</label>
									<div className="col-md-9">
										<input
											type="text"
											name="username"
											className="form-control"
											placeholder="Enter username"
											value={user.usernameOrEmail}
											onChange={(e) =>
												setUser({ ...user, usernameOrEmail: e.target.value })
											}
										></input>
									</div>
								</div>

								<div className="row mb-3">
									<label className="col-md-3 control-label"> Password </label>
									<div className="col-md-9">
										<input
											type="password"
											name="password"
											className="form-control"
											placeholder="Enter password"
											value={user.password}
											onChange={(e) =>
												setUser({ ...user, password: e.target.value })
											}
										></input>
									</div>
								</div>

								<div className="form-group mb-3">
									<button
										className="btn btn-primary"
										onClick={(e) => handleLoginForm(e)}
									>
										Submit
									</button>
								</div>
							</form>
							<div className="form-group text-center">
								<Link to={'/register'}>Register here</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginComponent;
