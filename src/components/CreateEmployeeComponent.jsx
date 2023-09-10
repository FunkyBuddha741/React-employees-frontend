import React, { useState } from 'react';
import { createEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const CreateEmployeeComponent = () => {
	const navigate = useNavigate();

	const [newEmployee, setNewEmployee] = useState({
		firstName: '',
		lastName: '',
		emailId: '',
	});

	const onClickSaveEmployee = (e) => {
		e.preventDefault();
		let employee = {
			firstName: newEmployee.firstName,
			lastName: newEmployee.lastName,
			email: newEmployee.emailId,
		};
		createEmployee(employee).then((res) => {
			navigate('/employees');
		});
	};

	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="card col-md-6 offset-md-3 offset-md-3">
						<h3 className="text-center">Add Employee</h3>
						<div className="card-body">
							<form>
								<div className="form-group">
									<label>First Name</label>
									<input
										required
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
									/>
								</div>
								<div className="form-group">
									<label>Last Name</label>
									<input
										required
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
									/>
								</div>
								<div className="form-group">
									<label>Email Id</label>
									<input
										type="email"
										placeholder="EmailId"
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
									/>
								</div>

								<button
									className="btn btn-success"
									onClick={onClickSaveEmployee}
								>
									Save
								</button>
								<button className="btn btn-danger">Cancel</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateEmployeeComponent;
