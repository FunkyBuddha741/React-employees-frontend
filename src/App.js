import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';

function App() {
	return (
		<>
			<HeaderComponent />
			<div className="container">
				<Router>
					<Routes>
						<Route path="/" element={<ListEmployeeComponent />} />
						<Route path="/employees" element={<ListEmployeeComponent />} />
						<Route path="/add-employee" element={<CreateEmployeeComponent />} />
						<Route
							path="/edit-employee/:id"
							element={<CreateEmployeeComponent />}
						/>
					</Routes>
				</Router>
			</div>
			<FooterComponent />
		</>
	);
}

export default App;
