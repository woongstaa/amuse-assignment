import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../features/FormInput';
import { FormWrapper, Portal } from '../shared/component';
import { Card, Button } from '../shared/ui';
import { Todo, todoSchema } from '../entities/todoApi';
export function AddTodoModal({ isVisible, setIsVisible }: { isVisible: boolean; setIsVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  const form = useForm<Todo>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: '',
      dueDate: undefined,
      memo: '',
      isPrior: false,
      isComplete: false
    }
  });
  if (!isVisible) return null;

  return (
    <Portal isVisible={isVisible} setIsVisible={setIsVisible}>
      <div className='h-dvh flex justify-center items-center'>
        <Card className='w-3/6 p-4 rounded-lg' onClick={(e) => e.stopPropagation()}>
          <FormWrapper form={form} onSubmit={() => {}}>
            <FormInput //
              control={form.control}
              name='title'
              label='할 일'
              placeholder='할 일을 입력하세요'
              description='할 일은 10글자 이하로 입력해주세요'
            />
            <div className='h-8' />
            <div className='flex justify-end'>
              <Button type='submit'>추가하기</Button>
            </div>
          </FormWrapper>
        </Card>
      </div>
    </Portal>
  );
}
