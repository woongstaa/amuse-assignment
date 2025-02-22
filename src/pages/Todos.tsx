import { List } from '@/widgets/list';
import { useTodos } from '@/features/useTodos';
import { Top } from '@/widgets/top';
import { Bottom } from '@/widgets/bottom';
import { EditTodoForm, AddTodoForm } from '@/widgets/modal';

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
