import React, { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from '../services/EmployeeService';
import { useNavigate, Link } from 'react-router-dom';
import { getUserRoles, useAuth } from '../services/AuthService';
import edit from '../assets/image/edit.svg';
import del from '../assets/image/delete.svg';

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
		<>
			<h2 className="text-center">Employees List</h2>
			<div style={{ float: 'right', marginBottom: '15px', marginTop: '15px' }}>
				{userRoles.includes('ROLE_ADMIN') ? (
					<button className="btn btn-success" onClick={onHandleClick}>
						Add Employee
					</button>
				) : null}
			</div>

			<div className="table-responsive-xl">
				<table className="table table-hover">
					<thead>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email Id</th>
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
											<div style={{ display: 'inline', width: '25px' }}>
												<Link
													style={{ width: '25px' }}
													to={`/edit-employee/${employee.id}`}
												>
													<img
														style={{ width: 'inherit', cursor: 'pointer' }}
														src={edit}
														alt=""
													/>
												</Link>
											</div>
											<div
												style={{
													display: 'inline',
													width: '25px',
													marginLeft: '8px',
												}}
											>
												<img
													style={{ width: 'inherit', cursor: 'pointer' }}
													src={del}
													onClick={() => onDeleteEmployee(employee.id)}
													alt=""
												/>
											</div>

											{/* <button
												className="btn btn-danger"
												onClick={() => onDeleteEmployee(employee.id)}
												style={{ marginLeft: '10px' }}
											>
												Delete
											</button> */}
										</td>
									) : null}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default ListEmployeeComponent;
