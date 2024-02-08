import { SubmitHandler, useForm } from "react-hook-form";
import { useIsFetching } from "@tanstack/react-query";
import { useTodos, useTodosIds } from "../services/queries"
import { useCreateTodo, useDeleteTodo, useUpdateTodo } from "../services/mutations";
import { Todo } from "../types/todo";


function Todos() {
	const todosIdsQuery = useTodosIds();
	const todosQueries = useTodos(todosIdsQuery.data);
	//console.log("todosQueries:"); console.log(todosQueries);

	const createTodoMutation = useCreateTodo();
	const updateTodoMutation = useUpdateTodo();
	const deleteTodoMutation = useDeleteTodo();

	const {register, handleSubmit } = useForm<Todo>();

	const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
		createTodoMutation.mutate(data);
	}

	const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
		if (data) {
			updateTodoMutation.mutate({ ...data, checked: true });
		}
	}

	const handleDeleteTodo = async (id: number) => {
		await deleteTodoMutation.mutateAsync(id);
		console.log('delete success!')
	}

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
			
			{todosIdsQuery.data?.map((id) => (
				<p key={id}>id: {id}</p>
			))}
			*/}
			<form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
				<h4>New todo:</h4>
				<div style={{paddingBottom: "5px"}}>
					<input placeholder="Title" {...register("title")} />
				</div>
				<div style={{paddingBottom: "5px"}}>
					<input placeholder="Description" {...register("description")} />
				</div>
				<input
					type="submit"
					disabled={createTodoMutation.isPending}
					value={createTodoMutation.isPending ? 'Creating...' : 'Create todo'}
				/>
			</form>

			<ul>
				{todosQueries.map(({ data }) => (
					<li key={data?.id} style={{borderBottom:"1px solid black", listStyle:"none"}}>
						<div>Id: {data?.id}</div>
						<span>
							<strong>Title:</strong> {data?.title},{" "}
							<strong>Description:</strong> {data?.description}
						</span>
						<span style={{paddingLeft: "10px"}}>
							<button
								onClick={() => handleMarkAsDoneSubmit(data)}
								disabled={data?.checked}
							>
								{data?.checked ? "Done" : "Mark as done"}
							</button>
							{data && data?.id && (
								<button onClick={() => handleDeleteTodo(data.id!)} style={{marginLeft: "5px"}}>
									Delete
								</button>
							)}
						</span>
					</li>
				))}
			</ul>
			
		</>
	)
}

export default Todos;