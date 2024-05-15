import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import { AuthProvider } from './services/AuthService';
import ForbiddenComponent from './components/ForbiddenComponent';
import AuthenticatedRoute from './routes/AuthenticatedRoute';
import AuthorizedRoute from './routes/AuthorizedRoute';
import { ToastContainer } from 'react-toastify';
import AuthVerify from './services/AuthVerify';

function App() {
	return (
		<AuthProvider>
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
								<AuthorizedRoute>
									<CreateEmployeeComponent />
								</AuthorizedRoute>
							</AuthenticatedRoute>
						}
					/>
					<Route
						path="/edit-employee/:id"
						element={
							<AuthenticatedRoute>
								<AuthorizedRoute>
									<CreateEmployeeComponent />
								</AuthorizedRoute>
							</AuthenticatedRoute>
						}
					/>
					<Route path="/forbidden" element={<ForbiddenComponent />} />
				</Routes>
				<ToastContainer />
			</div>
			{/* <FooterComponent /> */}
			{/* <AuthVerify /> */}
		</AuthProvider>
	);
}

export default App;
