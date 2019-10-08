import React from 'react';
import { connect } from 'react-redux';
import { Progress } from 'reactstrap';

function mapStateToProps(state) {
	return {
		upload: state.upload
	};
}

export default connect(mapStateToProps, null)(props => {
	function renderProgressBar() {
		if (!props.upload.finished) {
			return (
				<div
					style={{
						position: 'fixed',
						height: '100vh',
						width: '100vw',
						backgroundColor: 'rgba(0, 0, 0, 0.8)',
						zIndex: '100',
						top: '0',
						left: '0',
						cursor: 'wait'
					}}
					className='d-flex justify-content-center align-items-center flex-column'
				>
					<h3 style={{ color: '#ffffff', marginBottom: '20px' }}>上传中...</h3>
					<Progress animated value={props.upload.progress} style={{ width: '50vw', height: '25px' }} />
				</div>
			);
		}
	}

	return <React.Fragment>{renderProgressBar()}</React.Fragment>;
});
