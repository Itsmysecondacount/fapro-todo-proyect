import React, { useState } from 'react';
import './addTodoItem.css';
import { ReactComponent as SvgFapro } from '../others/forma1.svg';

export const AddTodoItem = ({ createData, setSearchValue }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const buttonForCreateData = () => {
		const date = new Date();
		const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
		const [hour, minutes] = [date.getHours(), date.getMinutes()];
		let newData = {
			title: title,
			description: description,
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
		createData(newData);
		setTitle('');
		setDescription('');
		setSearchValue('');
	};

	return (
		<div className="Add-Todo-Item general-container">
			<h1>ToDo Fapro || Agregar</h1>
			<div className="group">
				<input
					required
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					value={title}
				/>
				<label>Nombre del ToDo</label>
			</div>
			<div className="group">
				<textarea
					required
					onChange={(e) => {
						setDescription(e.target.value);
					}}
					value={description}
				/>
				<label>Descripción</label>
			</div>
			<button onClick={buttonForCreateData} className="custom-btn btn-1">
				Agregar ToDo
			</button>
			<SvgFapro className="fapro-svg" />
		</div>
	);
};
