import axios from 'axios';
import { getToken } from './AuthService';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/v1/employees';

// For sending token in authorization header

axios.interceptors.request.use(
	function (config) {
		config.headers['Authorization'] = getToken();
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export const getEmployees = () => {
	return axios.get(EMPLOYEE_API_BASE_URL);
};

export const getEmployeesWithId = (employee_id) => {
	return axios.get(`${EMPLOYEE_API_BASE_URL}/${employee_id}`);
};

export const createEmployee = (employee) => {
	return axios.post(EMPLOYEE_API_BASE_URL, employee);
};

export const deleteEmployee = (employee_id) => {
	return axios.delete(`${EMPLOYEE_API_BASE_URL}/${employee_id}`);
};

export const updateEmployee = (employee_id, employee) => {
	return axios.put(`${EMPLOYEE_API_BASE_URL}/${employee_id}`, employee);
};
