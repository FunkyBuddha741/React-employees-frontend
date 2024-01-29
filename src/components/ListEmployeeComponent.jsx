import React, { useState, useEffect } from 'react';
import {
	getEmployees,
	deleteEmployee,
	getEmployeesWithPaginationAndSorting,
} from '../services/EmployeeService';
import { useNavigate, Link } from 'react-router-dom';
import { getUserRoles, useAuth } from '../services/AuthService';
import edit from '../assets/image/edit.svg';
import del from '../assets/image/delete.svg';
import { showToast } from '../utils/showToast';
import PaginationComponent from './PaginationComponent';
import Select from 'react-select';

const ListEmployeeComponent = () => {
	let navigate = useNavigate();
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [activePage, setActivePage] = useState(1);

	const [data, setData] = useState([]);

	console.log(data);

	const [userRoles, setUserRoles] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const roles = getUserRoles();
		setUserRoles(roles);
		getEmployeesWithPaginationAndSorting(activePage, itemsPerPage)
			.then((res) => {
				setData(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const onDeleteEmployee = (id) => {
		deleteEmployee(id)
			.then((res) => {
				getEmployeesWithPaginationAndSorting(activePage, itemsPerPage)
					.then((res) => {
						setData(res.data);
						setLoading(false);
					})
					.catch((err) => {
						console.log(err);
					});
				showToast('Employee deleted', 'success');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onHandleClick = () => {
		navigate('/add-employee');
	};

	const options = [
		{ value: '2', label: '2' },
		{ value: '4', label: '4' },
		{ value: '6', label: '6' },
		{ value: '8', label: '8' },
		{ value: '10', label: '10' },
	];

	const handleChange = (e) => {
		console.log(e.value);
		getEmployeesWithPaginationAndSorting(activePage, e.value)
			.then((res) => {
				setData(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<h2 className="text-center">Employees List</h2>
			{/* <div
				style={{
					display: 'flex',
					alignItems: 'center',
					float: 'left',
					marginBottom: '15px',
					marginTop: '15px',
				}}
			>
				<label style={{ fontSize: '13px', margin: '0px' }}>
					Items Per Page:
				</label>
				<Select options={options} onChange={handleChange} />
			</div> */}
			<div style={{ float: 'right', marginBottom: '15px', marginTop: '15px' }}>
				{userRoles.includes('ROLE_ADMIN') ? (
					<button className="btn btn-success" onClick={onHandleClick}>
						Add Employee
					</button>
				) : null}
			</div>

			<div>
				{loading ? (
					<div className="loader" />
				) : (
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
								{data?.employees.map((employee, key) => {
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
												</td>
											) : null}
										</tr>
									);
								})}
							</tbody>
						</table>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<PaginationComponent
								nPages={data?.totalPages}
								currentPage={activePage}
								setCurrentPage={setActivePage}
								setData={setData}
								setLoading={setLoading}
							/>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default ListEmployeeComponent;
