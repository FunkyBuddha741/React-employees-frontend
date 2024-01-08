import React, { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from '../services/EmployeeService';
import { useNavigate, Link } from 'react-router-dom';
import { getUserRoles } from '../services/AuthService';

const ListEmployeeComponent = () => {
	let navigate = useNavigate();
	const [employees, setEmployees] = useState([]);
	const [userRoles, setUserRoles] = useState([]);

	useEffect(() => {
		const roles = getUserRoles();
		setUserRoles(roles);
		getEmployees()
			.then((res) => {
				setEmployees(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const onDeleteEmployee = (id) => {
		deleteEmployee(id)
			.then((res) => {
				console.log(res);
				const new_employee = employees.filter((employee) => employee.id !== id);
				setEmployees(new_employee);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onHandleClick = () => {
		navigate('/add-employee');
	};

	return (
		<div>
			<h2 className="text-center">Employees List</h2>
			<div className="row my-5">
				{userRoles.includes('ROLE_ADMIN') ? (
					<button className="btn btn-primary" onClick={onHandleClick}>
						Add Employee
					</button>
				) : null}
			</div>
			<div className="row">
				<table className="table table-striped table-bordered">
					<thead>
						<tr>
							<th>Employee First Name</th>
							<th>Employee Last Name</th>
							<th>Employee Email Id</th>
							{userRoles.includes('ROLE_ADMIN') ||
							userRoles.includes('ROLE_MODERATOR') ? (
								<th>Actions</th>
							) : null}
						</tr>
					</thead>
					<tbody>
						{employees.map((employee, key) => {
							return (
								<tr key={key}>
									<td>{employee.firstName}</td>
									<td>{employee.lastName}</td>
									<td>{employee.emailId}</td>
									{userRoles.includes('ROLE_ADMIN') ||
									userRoles.includes('ROLE_MODERATOR') ? (
										<td>
											<Link
												className="btn btn-info"
												to={`/edit-employee/${employee.id}`}
											>
												Update
											</Link>
											<button
												className="btn btn-danger"
												onClick={() => onDeleteEmployee(employee.id)}
												style={{ marginLeft: '10px' }}
											>
												Delete
											</button>
										</td>
									) : null}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ListEmployeeComponent;
