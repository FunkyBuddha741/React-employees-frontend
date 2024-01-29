import React from 'react';
import { getEmployeesWithPaginationAndSorting } from '../services/EmployeeService';

const PaginationComponent = ({
	nPages,
	currentPage,
	setCurrentPage,
	setData,
	setLoading,
}) => {
	const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

	const goToNextPage = () => {
		if (currentPage !== nPages) {
			setCurrentPage(++currentPage);
			getEmployeesWithPaginationAndSorting(currentPage, 5)
				.then((res) => {
					setData(res.data);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	const goToPrevPage = () => {
		if (currentPage !== 1) {
			setCurrentPage(--currentPage);
			getEmployeesWithPaginationAndSorting(currentPage, 5)
				.then((res) => {
					setData(res.data);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	const setToPageNumber = (pgNumber) => {
		setCurrentPage(pgNumber);
		getEmployeesWithPaginationAndSorting(pgNumber, 5)
			.then((res) => {
				setData(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<nav>
			<ul className="pagination justify-content-center">
				<li className="page-item">
					<button
						className="page-link"
						onClick={goToPrevPage}
						disabled={currentPage === 1}
					>
						Previous
					</button>
				</li>
				{pageNumbers.map((pgNumber) => (
					<li
						key={pgNumber}
						className={`page-item ${currentPage === pgNumber ? 'active' : ''} `}
					>
						<button
							onClick={() => setToPageNumber(pgNumber)}
							className="page-link"
						>
							{pgNumber}
						</button>
					</li>
				))}
				<li className="page-item">
					<button
						className="page-link"
						onClick={goToNextPage}
						disabled={currentPage === nPages}
					>
						Next
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default PaginationComponent;
