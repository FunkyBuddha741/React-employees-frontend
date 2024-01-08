import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import { isUserLoggedIn, getUserRoles } from './services/AuthService';
import ForbiddenComponent from './components/ForbiddenComponent';

function App() {
	let AuthenticatedRoute = ({ children }) => {
		const isAuth = isUserLoggedIn();
		if (isAuth) {
			return children;
		}
		return <Navigate to="/" />;
	};

	let ProtectedRoute = ({ children }) => {
		const roles = getUserRoles();
		if (roles.includes('ROLE_USER')) {
			<Navigate to="/Forbidden" />;
		} else {
			return children;
		}
	};

	return (
		<>
			<HeaderComponent />
			<div className="container">
				<Routes>
					<Route path="/" element={<Navigate to="/login" />} />
					<Route path="/register" element={<RegisterComponent />} />
					<Route path="/login" element={<LoginComponent />} />
					<Route
						path="/employees"
						element={
							<AuthenticatedRoute>
								<ListEmployeeComponent />
							</AuthenticatedRoute>
						}
					/>
					<Route
						path="/add-employee"
						element={
							<AuthenticatedRoute>
								<ProtectedRoute>
									<CreateEmployeeComponent />
								</ProtectedRoute>
							</AuthenticatedRoute>
						}
					/>
					<Route
						path="/edit-employee/:id"
						element={
							<AuthenticatedRoute>
								<ProtectedRoute>
									<CreateEmployeeComponent />
								</ProtectedRoute>
							</AuthenticatedRoute>
						}
					/>
					<Route path="/forbidden" element={<ForbiddenComponent />} />
				</Routes>
			</div>
			<FooterComponent />
		</>
	);
}

export default App;
