import { useState } from 'react';
import { Todo } from '../entities/todoApi';

export function useTodos() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  return {
    addModalVisible, //
    editModalVisible,
    setAddModalVisible,
    setEditModalVisible,
    currentTodo,
    setCurrentTodo
  };
}
