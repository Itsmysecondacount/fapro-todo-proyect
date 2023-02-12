import React from 'react';

export const useLocalStorage = () => {
	const itemName = 'USERS';
	const initialValue = '';

	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(false);
	const [empty, setEmpty] = React.useState(false);
	const [item, setItem] = React.useState(initialValue);
	const [searchValue, setSearchValue] = React.useState('');

	React.useEffect(() => {
		setTimeout(() => {
			try {
				const localStorageItem = localStorage.getItem(itemName);
				let parsedItem;
				let arrayTodos;

				if (!localStorageItem) {
					localStorage.setItem('USERS', JSON.stringify(initialValue));
					arrayTodos = initialValue;
				} else {
					parsedItem = JSON.parse(localStorageItem);
					arrayTodos = Array.from(parsedItem);
				}
				if (!arrayTodos.length) {
					setEmpty(true);
				} else {
					setEmpty(false);
				}

				setItem(arrayTodos);
				setLoading(false);
				console.log('LocalStorage : correct');
			} catch (error) {
				console.log(error);
				setError(error);
				setLoading(false);
				setEmpty(false);
			}
		}, 1000);
	}, []);

	const saveItem = (newTodos) => {
		try {
			const stringifyTodos = JSON.stringify(newTodos);
			localStorage.setItem(itemName, stringifyTodos);
			setItem(newTodos);
		} catch (error) {
			setError(error);
		}
	};

	let searchedTodos = [];

	if (!searchValue.length >= 1) {
		searchedTodos = item;
	} else {
		searchedTodos = item.filter((todo) => {
			const todoText = todo.title.toLowerCase();
			const searchText = searchValue.toLowerCase();
			return todoText.includes(searchText);
		});
	}

	const deleteData = (title) => {
		// const todoNew = todos.filter(todo => todo.title !== title); método 1
		//Método 2
		const todoIndx = item.findIndex((todo) => todo.title === title);
		const todoNew = [...item];
		todoNew.splice(todoIndx, 1);
		//no me sale con el método 2 xd

		saveItem(todoNew);
	};

	const createData = (newVlue) => {
		const date = new Date();
		const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
		const [hour, minutes] = [date.getHours(), date.getMinutes()];
		const todoNew = [...item];
		const nuevoDic = {
			...newVlue,
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
		todoNew.push(nuevoDic);

		saveItem(todoNew);
	};

	const updateData = (dataObj) => {
		const indexItem = item.findIndex((todo) => todo.title === dataObj.prevTitle);
		const newItems = [...item];
		newItems[indexItem] = dataObj;
		console.log(indexItem);
		console.log(dataObj);
		console.log('***');
		console.log(newItems);
		saveItem(newItems);
	};

	return {
		loading,
		error,
		empty,
		searchValue,
		searchedTodos,

		deleteData,
		createData,
		setSearchValue,
		updateData,
	};
};
