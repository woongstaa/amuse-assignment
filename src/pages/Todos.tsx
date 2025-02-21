import { Top, Bottom } from '../widgets';
import { List } from '../widgets/List';
import { EditTodoForm } from '../widgets/modal/EditTodoForm';
import { AddTodoForm } from '../widgets/modal/AddTodoForm';
import { useTodos } from '../features/useTodos';

export function Todos() {
  const {
    addModalVisible, //
    editModalVisible,
    setAddModalVisible,
    setEditModalVisible,
    currentTodo,
    setCurrentTodo
  } = useTodos();

  return (
    <main className='w-[100dvw] flex flex-col items-center'>
      <div className='min-w-[560px] h-[100dvh] flex flex-col justify-between'>
        <Top />
        <List setCurrentTodo={setCurrentTodo} setEditModalVisible={setEditModalVisible} />
        <Bottom setAddModalVisible={setAddModalVisible} />
      </div>
      <AddTodoForm isVisible={addModalVisible} setIsVisible={setAddModalVisible} />
      <EditTodoForm isVisible={editModalVisible} setIsVisible={setEditModalVisible} currentTodo={currentTodo} />
    </main>
  );
}
