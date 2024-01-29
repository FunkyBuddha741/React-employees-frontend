import React, { useState, useEffect } from 'react';
import {
	createEmployee,
	getEmployeesWithId,
	updateEmployee,
} from '../services/EmployeeService';
import { useNavigate, Link, useParams } from 'react-router-dom';
import leftArrow from '../assets/image/leftArrow.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '../utils/showToast';

const CreateEmployeeComponent = () => {
	const navigate = useNavigate();
	const { id } = useParams();

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
				showToast('Employee saved successfully', 'success');
				navigate('/employees');
			});
		} else {
			updateEmployee(id, employee).then((res) => {
				showToast('Employee updated successfully', 'success');
				navigate('/employees');
			});
		}
	};

	return (
		<div className="row mt-5">
			<div className="col-md-6 offset-md-3">
				<div className="card">
					<div className="card-header">
						<div style={{ width: '30px', position: 'absolute', top: '30px' }}>
							<Link style={{ width: 'inherit' }} to={'/employees'}>
								<img style={{ width: 'inherit' }} src={leftArrow} alt="" />
							</Link>
						</div>

						<h3 className="text-center p-3">
							{id ? 'Update Employee' : 'Add Employee'}
						</h3>
					</div>
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
								<label>Email</label>
								<input
									type="email"
									placeholder="Email"
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
								className="btn btn-primary"
								onClick={onClickUpdateOrSaveEmployee}
							>
								Save
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateEmployeeComponent;
