import { useState } from 'react';
import { Todo } from '../entities/todoApi';
import { Top, Bottom, AddTodoModal } from '../widgets';
import { Item } from '../widgets/Item';

const dummy: Todo = {
  id: 1,
  title: 'dasdfasdfads',
  dueDate: '2025-02-18',
  // place: {
  //   name: '',
  //   address: ''
  // },
  createdAt: '2025-02-18',
  lastEditedAt: '',
  removedAt: '',
  isComplete: false,
  isPrior: false,
  memo: ''
  // url: ''
};

export function Todos() {
  const { modalVisible, setModalVisible } = useTodos();

  return (
    <main className='w-[100dvw] flex flex-col items-center'>
      <div className='min-w-[560px] h-[100dvh] flex flex-col justify-between'>
        <Top />
        {modalVisible}

        <Item todo={dummy} />
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
