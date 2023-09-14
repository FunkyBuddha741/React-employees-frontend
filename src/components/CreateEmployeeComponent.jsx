import React, { useState, useEffect } from 'react';
import {
	createEmployee,
	getEmployeesWithId,
	updateEmployee,
} from '../services/EmployeeService';
import { useNavigate, Link, useParams } from 'react-router-dom';

const CreateEmployeeComponent = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	console.log(id);

	const [newEmployee, setNewEmployee] = useState({
		firstName: '',
		lastName: '',
		emailId: '',
	});

	useEffect(() => {
		if (id) {
			getEmployeesWithId(id)
				.then((res) => {
					setNewEmployee({
						firstName: res.data.firstName,
						lastName: res.data.lastName,
						emailId: res.data.emailId,
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [id]);

	const onClickUpdateOrSaveEmployee = (e) => {
		e.preventDefault();
		let employee = {
			firstName: newEmployee.firstName,
			lastName: newEmployee.lastName,
			emailId: newEmployee.emailId,
		};

		if (id === undefined) {
			createEmployee(employee).then((res) => {
				navigate('/employees');
			});
		} else {
			updateEmployee(id, employee).then((res) => {
				navigate('/employees');
			});
		}
	};

	return (
		<div>
			<Link to={`/employees`}>Go back to Employees</Link>
			<div className="container py-5">
				<div className="row">
					<div className="card col-md-6 offset-md-3 offset-md-3">
						<h3 className="text-center p-3">
							{id ? 'Update Employee' : 'Add Employee'}
						</h3>
						<div className="card-body">
							<form>
								<div className="form-group">
									<label>First Name</label>
									<input
										type="text"
										placeholder="FirstName"
										name="firstName"
										className="form-control"
										value={newEmployee.firstName}
										onChange={(e) =>
											setNewEmployee({
												firstName: e.target.value,
												lastName: newEmployee.lastName,
												emailId: newEmployee.emailId,
											})
										}
										required
									/>
								</div>
								<div className="form-group">
									<label>Last Name</label>
									<input
										type="text"
										placeholder="Last Name"
										name="lastName"
										className="form-control"
										value={newEmployee.lastName}
										onChange={(e) =>
											setNewEmployee({
												firstName: newEmployee.firstName,
												lastName: e.target.value,
												emailId: newEmployee.emailId,
											})
										}
										required
									/>
								</div>
								<div className="form-group">
									<label>Email Id</label>
									<input
										type="email"
										placeholder="Email Id"
										name="emailId"
										className="form-control"
										value={newEmployee.emailId}
										onChange={(e) =>
											setNewEmployee({
												firstName: newEmployee.firstName,
												lastName: newEmployee.lastName,
												emailId: e.target.value,
											})
										}
										required
									/>
								</div>

								<button
									className="btn btn-success"
									onClick={onClickUpdateOrSaveEmployee}
								>
									Save
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateEmployeeComponent;
