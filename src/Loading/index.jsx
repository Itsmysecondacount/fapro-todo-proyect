import React from 'react';
import './loading.css';

export const LoadingC = () => {
	return (
		<div className="center-loading">
			<div className="lds-ripple">
				<div></div>
				<div></div>
			</div>
		</div>
	);
};
