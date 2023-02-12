import React from 'react';
import { TodoItem } from '../TodoItem';
import { EmptyTodo } from '../EmptyTodo';
import { Error } from '../Error';
import './listItems.css';

export const ListItems = ({ data, deleteData, updateData, setSearchValue, error }) => {
	return (
		<>
			<div className="list-display-of-right general-container">
				{/* Aquí viene el map */}
				<ul>
					{!!data.length && !error ? (
						<>
							{data.map((el) => (
								<TodoItem
									key={el.title}
									title={el.title}
									description={el.description}
									date={el.dateCreation}
									deleteData={deleteData}
									updateData={updateData}
									setSearchValue={setSearchValue}
								/>
							))}
						</>
					) : error ? (
						<Error />
					) : (
						<EmptyTodo />
					)}
				</ul>
			</div>
		</>
	);
};
