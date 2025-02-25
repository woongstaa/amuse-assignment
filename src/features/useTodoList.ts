import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type Todo, todoApi } from '@/entities/todoApi';

export function useTodoList({ setCurrentTodo, setEditModalVisible }: { setCurrentTodo: (todo: Todo | null) => void; setEditModalVisible: (visible: boolean) => void }) {
  const queryClient = useQueryClient();

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

  return { updateTodo, deleteTodo, onEdit };
}
