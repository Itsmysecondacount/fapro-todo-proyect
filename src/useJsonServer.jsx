import { useEffect, useState } from 'react';
import { helpHttp } from './helperHttp';

export const useJsonServer = () => {
	const [db, setDb] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	let searchedTodos = [];

	if (!(searchValue.length >= 1)) {
		searchedTodos = db;
	} else {
		searchedTodos = db.filter((el) => {
			const todoText = el.title.toLowerCase();
			const searchText = searchValue.toLowerCase();
			return todoText.includes(searchText);
		});
	}

	let api = helpHttp();
	let url = 'http://localhost:5000/USERS';

	useEffect(() => {
		setLoading(true);
		api.get(url).then((res) => {
			setError(false);
			if (!res.err) {
				setDb(res);
			} else {
				setDb(null);
				setError(res);
			}
			setLoading(false);
		});
	}, []);

	const createData = (data) => {
		setLoading(true);
		let options = {
			body: data,
			headers: { 'content-type': 'application/json' },
		};

		api.post(url, options).then((res) => {
			if (!res.err) {
				setDb([...db, res]);
			} else {
				setError(res);
			}
			setLoading(false);
		});
	};

	const updateData = (data) => {
		setLoading(true);
		let endpoint = `${url}/${data.id}`;

		let options = {
			body: data,
			headers: { 'content-type': 'application/json' },
		};

		api.put(endpoint, options).then((res) => {
			//console.log(res);
			if (!res.err) {
				let newData = db.map((el) => (el.id === data.id ? data : el));
				setDb(newData);
			} else {
				setError(res);
			}
			setLoading(false);
		});
	};

	const deleteData = (id) => {
		setLoading(true);
		let isDelete = true;

		if (isDelete) {
			let endpoint = `${url}/${id}`;
			let options = {
				headers: { 'content-type': 'application/json' },
			};

			api.del(endpoint, options).then((res) => {
				//console.log(res);
				if (!res.err) {
					let newData = db.filter((el) => el.id !== id);
					setDb(newData);
				} else {
					setError(res);
				}
				setLoading(false);
			});
		} else {
			setLoading(false);
			return;
		}
	};

	return {
		loading,
		error,
		searchValue,
		searchedTodos,

		createData,
		updateData,
		deleteData,
		setSearchValue,
	};
};
