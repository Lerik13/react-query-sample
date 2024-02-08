import { useIsFetching } from "@tanstack/react-query";
import { useTodos, useTodosIds } from "../services/queries"


function Todo() {
	const todosIdsQuery = useTodosIds();
	const todosQueries = useTodos(todosIdsQuery.data);
	
	//const isFetching  = useIsFetching();
/*
	if (todosIdsQuery.isPending) {
		return <span>Loading...</span>
	}

	if (todosIdsQuery.isError) {
		return <span>there is an error!</span>
	}
*/
	return (
		<>
		{/*
			<p>Query function status: {todosIdsQuery.fetchStatus}</p>
			<p>Query data status: {todosIdsQuery.status}</p>
			<p>Global isFetching: {isFetching}</p>
		*/}
			{todosIdsQuery.data?.map((id) => (
				<p key={id}>id: {id}</p>
			))}
			
			<ul>
				{todosQueries.map(({data}) => (
					<li key={data?.id}>
						<div>Id: {data?.id}</div>
						<span>
							<strong>Title:</strong> {data?.title},{" "}
							<strong>Description:</strong> {data?.description}
						</span>
					</li>
				))}
			</ul>
		</>
	)
}

export default Todo