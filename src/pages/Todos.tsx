import { List } from '../widgets/list';
import { useTodos } from '../features/useTodos';
import { Top } from '../widgets/top';
import { Bottom } from '../widgets/bottom';
import { EditTodoForm, AddTodoForm } from '../widgets/modal';

export function Todos() {
  const { addModalVisible, editModalVisible, setAddModalVisible, setEditModalVisible, currentTodo, setCurrentTodo } = useTodos();

  return (
    <main className='w-[100dvw] h-[100dvh] flex flex-col items-center'>
      <div className='w-[100dvw] max-w-[560px] h-full flex flex-col p-4'>
        <Top />
        <List setCurrentTodo={setCurrentTodo} setEditModalVisible={setEditModalVisible} />
        <Bottom setAddModalVisible={setAddModalVisible} />
      </div>
      <AddTodoForm isVisible={addModalVisible} setIsVisible={setAddModalVisible} />
      <EditTodoForm isVisible={editModalVisible} setIsVisible={setEditModalVisible} currentTodo={currentTodo} />
    </main>
  );
}
