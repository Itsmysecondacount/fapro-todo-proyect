import './App.css';
import './GeneralStyles.css';
import { AddTodoItem } from './AddTodoItem';
import { SearchItems } from './SearchItems';
import { ListItems } from './ListItems';
// import { useJsonServer } from './useJsonServer';
import { LoadingC } from './Loading';
import { useLocalStorage } from './useLocalStorage';

function App() {
	const {
		searchedTodos,
		loading,
		searchValue,
		error,
		updateData,
		createData,
		deleteData,
		setSearchValue,
	} = useLocalStorage();

	return (
		<div className="App-principal-container">
			<div className="App-left-container general-container">
				<AddTodoItem
					createData={createData}
					setSearchValue={setSearchValue}
					error={error}
				/>
			</div>
			<div className="App-right-container">
				<SearchItems
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					error={error}
				/>
				{!loading ? (
					<ListItems
						data={searchedTodos}
						deleteData={deleteData}
						updateData={updateData}
						setSearchValue={setSearchValue}
						error={error}
					/>
				) : (
					<LoadingC />
				)}
			</div>
		</div>
	);
}

export default App;
