import React, { useState } from 'react';
import Select from 'react-select';
import { registerAPICall } from '../services/AuthService';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
	const navigate = useNavigate();
	const [registrationInfo, setRegistrationInfo] = useState({
		firstName: '',
		lastName: '',
		userName: '',
		email: '',
		password: '',
		role: [],
	});

	const options = [
		{ value: 'admin', label: 'ADMIN' },
		{ value: 'mod', label: 'MODERATOR' },
		{ value: 'user', label: 'USER' },
	];

	const registerUser = (e) => {
		e.preventDefault();
		const user = {
			...registrationInfo,
			role: registrationInfo.role.map((r) => r.value),
		};
		console.log(user);
		registerAPICall(user)
			.then((res) => {
				console.log(res.data);
				navigate('/login');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleChange = (e) => {
		setRegistrationInfo({ ...registrationInfo, role: e });
	};

	return (
		<div className="container">
			<br />
			<br />
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<div className="card">
						<div className="card-header">
							<h2 className="text-center">User Registration Form</h2>
						</div>
						<div className="card-body">
							<form>
								<div className="row mb-3">
									<label className="col-md-3 control-label">First Name</label>
									<div className="col-md-9">
										<input
											type="text"
											name="firstName"
											className="form-control"
											placeholder="Enter first name"
											value={registrationInfo.firstName}
											onChange={(e) =>
												setRegistrationInfo({
													...registrationInfo,
													firstName: e.target.value,
												})
											}
										/>
									</div>
								</div>
								<div className="row mb-3">
									<label className="col-md-3 control-label">Last Name</label>
									<div className="col-md-9">
										<input
											type="text"
											name="lastName"
											className="form-control"
											placeholder="Enter last name"
											value={registrationInfo.lastName}
											onChange={(e) =>
												setRegistrationInfo({
													...registrationInfo,
													lastName: e.target.value,
												})
											}
										/>
									</div>
								</div>
								<div className="row mb-3">
									<label className="col-md-3 control-label">User Name</label>
									<div className="col-md-9">
										<input
											type="text"
											name="userName"
											className="form-control"
											placeholder="Enter user name"
											value={registrationInfo.userName}
											onChange={(e) =>
												setRegistrationInfo({
													...registrationInfo,
													userName: e.target.value,
												})
											}
										/>
									</div>
								</div>
								<div className="row mb-3">
									<label className="col-md-3 control-label">Email</label>
									<div className="col-md-9">
										<input
											type="email"
											name="email"
											className="form-control"
											placeholder="Enter email"
											value={registrationInfo.email}
											onChange={(e) =>
												setRegistrationInfo({
													...registrationInfo,
													email: e.target.value,
												})
											}
										/>
									</div>
								</div>
								<div className="row mb-3">
									<label className="col-md-3 control-label">Password</label>
									<div className="col-md-9">
										<input
											type="password"
											name="password"
											className="form-control"
											placeholder="Enter password name"
											value={registrationInfo.password}
											onChange={(e) =>
												setRegistrationInfo({
													...registrationInfo,
													password: e.target.value,
												})
											}
										/>
									</div>
								</div>
								<div className="row mb-3">
									<label className="col-md-3 control-label">Role</label>
									<div className="col-md-9">
										<Select
											className="form-control"
											options={options}
											onChange={handleChange}
											value={registrationInfo.role}
											isMulti
										/>
									</div>
								</div>
								<div className="form-group mb-3">
									<button
										className="btn btn-primary"
										onClick={(e) => registerUser(e)}
									>
										Submit
									</button>
								</div>
							</form>
							<div className="form-group text-center">
								<Link to={'/login'}>Already Registered? Login here.</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterComponent;
