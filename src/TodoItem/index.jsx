import React, { useState } from 'react';
import { Modal } from '../Modal';
import './todoItem.css';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

export const TodoItem = ({
	title,
	description,
	date,
	deleteData,
	updateData,
	setSearchValue,
}) => {
	const [modal, setModal] = useState(false);
	const [showInfo, setShowInfo] = useState(false);

	const changeModal = () => {
		setModal(!modal);
	};

	return (
		<>
			<li onClick={() => setShowInfo(!showInfo)} className="data-element">
				<h3>{title}</h3>
				{!!showInfo ? (
					<>
						<p>{description}</p>
						<span onClick={() => changeModal()}>
							<AiFillEdit size={'30px'} color={''} className="edit-Icon" />
						</span>
						<span onClick={() => deleteData(title)}>
							<MdDelete size={'30px'} color={''} className="delete-Icon" />
						</span>
						<p>{date}</p>
					</>
				) : null}
			</li>
			{!!modal ? (
				<Modal
					changeModal={changeModal}
					title={title}
					description={description}
					updateData={updateData}
					setSearchValue={setSearchValue}
				/>
			) : null}
		</>
	);
};
