import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type Todo, todoApi } from '../entities/todoApi';
import { useParams } from 'react-router';

export function useTodoList({ setCurrentTodo, setEditModalVisible }: { setCurrentTodo: (todo: Todo | null) => void; setEditModalVisible: (visible: boolean) => void }) {
  const queryClient = useQueryClient();
  const { q } = useParams();

  const { data, isLoading, error } = useQuery<Todo[]>({
    queryKey: ['todos', q],
    queryFn: () => (q ? todoApi.getTodos({ q }) : todoApi.getTodos())
  });

  const { mutate: updateTodo } = useMutation({
    mutationFn: (todo: Todo) => todoApi.updateTodo({ ...todo, isComplete: !todo.isComplete }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const { mutate: deleteTodo } = useMutation({
    mutationFn: (todo: Todo) => todoApi.deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const onEdit = useCallback(
    (todo: Todo) => {
      setCurrentTodo(todo);
      setEditModalVisible(true);
    },
    [setCurrentTodo, setEditModalVisible]
  );

  return { data, isLoading, error, updateTodo, deleteTodo, onEdit };
}
