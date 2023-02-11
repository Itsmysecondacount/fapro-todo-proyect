import React from 'react';
import './searchItems.css';

export const SearchItems = ({ searchValue, setSearchValue }) => {
	return (
		<div className="header-of-right container-general">
			<h2>Buscador de ToDos ...</h2>
			<div className="group">
				<input
					value={searchValue}
					onChange={(event) => {
						setSearchValue(event.target.value);
					}}
				/>
				<label>Ingrese el texto ...</label>
			</div>
		</div>
	);
};
