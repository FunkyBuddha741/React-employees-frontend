import axios from 'axios';
import { getToken } from './AuthService';
import instance from './Api';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/v1/employees';

const EMPLOYEE_API_BASE_URL_NEW = 'http://localhost:8080/api/v1/employeesPagingSortingTwo';

// For sending token in authorization header

// axios.interceptors.request.use(
// 	function (config) {
// 		config.headers['Authorization'] = getToken();
// 		return config;
// 	},
// 	function (error) {
// 		return Promise.reject(error);
// 	}
// );

export const getEmployees = () => {
	return instance.get(EMPLOYEE_API_BASE_URL);
};

export const getEmployeesWithPaginationAndSorting = (pageNo, itemsPerPage) => {
	return instance.get(
		`${EMPLOYEE_API_BASE_URL_NEW}?page=${pageNo}&size=${itemsPerPage}`
	);
};

export const getEmployeesWithId = (employee_id) => {
	return instance.get(`${EMPLOYEE_API_BASE_URL}/${employee_id}`);
};

export const createEmployee = (employee) => {
	return instance.post(EMPLOYEE_API_BASE_URL, employee);
};

export const deleteEmployee = (employee_id) => {
	return instance.delete(`${EMPLOYEE_API_BASE_URL}/${employee_id}`);
};

export const updateEmployee = (employee_id, employee) => {
	return instance.put(`${EMPLOYEE_API_BASE_URL}/${employee_id}`, employee);
};
