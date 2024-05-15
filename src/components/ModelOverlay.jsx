import React from 'react';

const ModelOverlay = ({ modelShow, onHide, onDelete }) => {
	return (
		<div
			className={`modal fade ${modelShow ?? 'show'}`}
			style={{
				display: `${modelShow ?? 'block'}`,
				backgroundColor: `${modelShow ?? 'rgba(0,0,0,0.5)'}`,
			}}
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Modal title</h5>
						<button type="button" className="close" onClick={onHide}>
							<span>&times;</span>
						</button>
					</div>
					<div className="modal-body">
						Are you sure you want to delete this?
					</div>
					<div className="modal-footer">
						<button onClick={onDelete} className="btn btn-primary">
							Yes
						</button>
						<button onClick={onHide} className="btn btn-secondary">
							No
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModelOverlay;
