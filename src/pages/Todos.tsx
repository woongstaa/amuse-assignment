import { useState } from 'react';
import { Top, Bottom, AddTodoModal } from '../widgets';
import { List } from '../widgets/List';

export function Todos() {
  const { modalVisible, setModalVisible } = useTodos();

  return (
    <main className='w-[100dvw] flex flex-col items-center'>
      <div className='min-w-[560px] h-[100dvh] flex flex-col justify-between'>
        <Top />
        <List />
        <Bottom setModalVisible={setModalVisible} />
      </div>
      <AddTodoModal isVisible={modalVisible} setIsVisible={setModalVisible} />
    </main>
  );
}

function useTodos() {
  const [modalVisible, setModalVisible] = useState(false);

  return { modalVisible, setModalVisible };
}
