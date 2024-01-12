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
		<div className="row my-4">
			<div className="col-md-6 offset-md-3">
				<div className="card">
					<div className="card-header">
						<h2 className="text-center">User Registration Form</h2>
					</div>
					<div className="card-body">
						<form>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>First Name</label>
									<input
										type="text"
										name="firstName"
										className="form-control"
										placeholder="Enter First Name"
										value={registrationInfo.firstName}
										onChange={(e) =>
											setRegistrationInfo({
												...registrationInfo,
												firstName: e.target.value,
											})
										}
									/>
								</div>
								<div className="form-group col-md-6">
									<label>Last Name</label>
									<input
										type="text"
										name="lastName"
										className="form-control"
										placeholder="Enter Last Name"
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
							<div className="form-row">
								<div className="form-group col-md-6">
									<label>User Name</label>
									<input
										type="text"
										name="userName"
										className="form-control"
										placeholder="Enter User Name"
										value={registrationInfo.userName}
										onChange={(e) =>
											setRegistrationInfo({
												...registrationInfo,
												userName: e.target.value,
											})
										}
									/>
								</div>
								<div className="form-group col-md-6">
									<label>Role</label>
									<Select
										options={options}
										onChange={handleChange}
										value={registrationInfo.role}
										isMulti
									/>
								</div>
							</div>

							<div className="form-group ">
								<label>Email</label>

								<input
									type="email"
									name="email"
									className="form-control"
									placeholder="Enter Email"
									value={registrationInfo.email}
									onChange={(e) =>
										setRegistrationInfo({
											...registrationInfo,
											email: e.target.value,
										})
									}
								/>
							</div>

							<div className="form-group ">
								<label>Password</label>

								<input
									type="password"
									name="password"
									className="form-control"
									placeholder="Enter Password"
									value={registrationInfo.password}
									onChange={(e) =>
										setRegistrationInfo({
											...registrationInfo,
											password: e.target.value,
										})
									}
								/>
							</div>

							<button
								className="btn btn-primary"
								onClick={(e) => registerUser(e)}
							>
								Submit
							</button>
						</form>
						<div className="my-3 text-center">
							<Link to={'/login'}>Already Registered? Login here.</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterComponent;
