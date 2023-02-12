import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

export const Modal = ({ title, description, changeModal, updateData }) => {
	const [firstInput, setFirstInput] = useState(title);
	const [secondInput, setSecondInput] = useState(description);

	const buttonModal = () => {
		const date = new Date();
		const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
		const [hour, minutes] = [date.getHours(), date.getMinutes()];
		let newData = {
			prevTitle: title,
			title: firstInput,
			description: secondInput,
			dateCreation:
				hour +
				':' +
				minutes +
				'		' +
				month.toString() +
				'/' +
				day.toString() +
				'/' +
				year.toString(),
		};
		updateData(newData);
		changeModal();
	};

	return ReactDOM.createPortal(
		<div className="modal-window">
			<div className="center-window">
				<input onChange={(e) => setFirstInput(e.target.value)} value={firstInput} />
				<textarea onChange={(e) => setSecondInput(e.target.value)} value={secondInput} />
				<button onClick={buttonModal}>Cambiar</button>
				<button onClick={() => changeModal()}>Cerrar</button>
			</div>
		</div>,
		document.getElementById('modal'),
	);
};
