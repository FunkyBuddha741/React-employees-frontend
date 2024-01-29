import axios from 'axios';
import { getToken, getRefreshToken, storeToken } from './AuthService';

const instance = axios.create({
	baseURL: 'http://localhost:8080/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

instance.interceptors.request.use(
	(config) => {
		const token = getToken();
		if (token) {
			config.headers['Authorization'] = token; // for Spring Boot back-end
			// config.headers["x-access-token"] = token; // for Node.js Express back-end
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(res) => {
		return res;
	},
	async (err) => {
		const originalConfig = err.config;

		if (originalConfig.url !== '/auth/login' && err.response) {
			// Access Token was expired
			if (err.response.status === 401 && !originalConfig._retry) {
				originalConfig._retry = true;
				console.log('here');
				try {
					const rs = await instance.post('/auth/refreshToken', {
						refreshToken: getRefreshToken(),
					});

					const { accessToken } = rs.data;
					storeToken('Bearer ' + accessToken);

					return instance(originalConfig);
				} catch (_error) {
					return Promise.reject(_error);
				}
			}
		}

		return Promise.reject(err);
	}
);

export default instance;
