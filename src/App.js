import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import { isUserLoggedIn } from './services/AuthService';

function App() {
	let AuthenticatedRoute = ({ children }) => {
		const isAuth = isUserLoggedIn();
		if (isAuth) {
			return children;
		}
		return <Navigate to="/" />;
	};

	return (
		<>
			<HeaderComponent />
			<div className="container">
				<Router>
					<Routes>
						<Route path="/" element={<LoginComponent />} />
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
									<CreateEmployeeComponent />
								</AuthenticatedRoute>
							}
						/>
						<Route
							path="/edit-employee/:id"
							element={
								<AuthenticatedRoute>
									<CreateEmployeeComponent />
								</AuthenticatedRoute>
							}
						/>
					</Routes>
				</Router>
			</div>
			<FooterComponent />
		</>
	);
}

export default App;
