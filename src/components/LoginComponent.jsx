import React, { useState } from 'react';
import { loginAPICall, useAuth } from '../services/AuthService';
import { Link } from 'react-router-dom';

const LoginComponent = () => {
	const [user, setUser] = useState({ usernameOrEmail: '', password: '' });
	const auth = useAuth();

	const handleLoginForm = (e) => {
		e.preventDefault();
		auth.login(user);
	};

	return (
		<div className="row mt-5">
			<div className="col-md-6 offset-md-3">
				<div className="card">
					<div className="card-header">
						<h2 className="text-center"> Login Form </h2>
					</div>
					<div className="card-body">
						<form onSubmit={(e) => handleLoginForm(e)}>
							<div className="form-group col-md-12">
								<label>Username or Email</label>
								<input
									type="text"
									name="username"
									className="form-control"
									placeholder="Enter username"
									required
									value={user.usernameOrEmail}
									onChange={(e) =>
										setUser({ ...user, usernameOrEmail: e.target.value })
									}
								></input>
							</div>

							<div className="form-group col-md-12">
								<label> Password </label>

								<input
									type="password"
									name="password"
									className="form-control"
									placeholder="Enter password"
									required
									value={user.password}
									onChange={(e) =>
										setUser({ ...user, password: e.target.value })
									}
								></input>
							</div>
							<div className="form-group col-md-6">
								<button type="submit" className="btn btn-primary">
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
	);
};

export default LoginComponent;
