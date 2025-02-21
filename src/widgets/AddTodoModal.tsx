import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../features/FormInput';
import { FormWrapper, Portal } from '../shared/component';
import { Card, Button } from '../shared/ui';
import { createTodoSchema, CreateTodo, todoApi } from '../entities/todoApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormDatepicker } from '../features/FormDatepicker';

export function AddTodoModal({ isVisible, setIsVisible }: { isVisible: boolean; setIsVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { form, onSubmit } = useAddTodoModal(isVisible, setIsVisible);

  if (!isVisible) return null;

  return (
    <Portal isVisible={isVisible} setIsVisible={setIsVisible}>
      <div className='h-dvh flex justify-center items-center'>
        <Card className='w-3/6 p-4 rounded-lg' onClick={(e) => e.stopPropagation()}>
          <FormWrapper form={form} onSubmit={onSubmit}>
            <FormInput //
              control={form.control}
              name='title'
              label='할 일'
              placeholder='할 일을 입력하세요'
              description='할 일을 1자 이상 입력해주세요'
            />
            <div className='h-4' />
            <FormInput //
              control={form.control}
              name='memo'
              label='메모'
              placeholder='메모 내용을 입력하세요'
              description='메모를 자유롭게 작성해주세요'
            />
            <div className='h-4' />
            <FormDatepicker //
              control={form.control}
              name='dueDate'
              label='만료일'
              description='만료일을 선택해주세요'
            />
            <div className='h-8' />
            <div className='flex justify-between gap-2'>
              <Button variant={'outline'} onClick={() => setIsVisible(false)}>
                취소
              </Button>
              <Button type='submit'>추가하기</Button>
            </div>
          </FormWrapper>
        </Card>
      </div>
    </Portal>
  );
}

function useAddTodoModal(isVisible: boolean, setIsVisible: React.Dispatch<React.SetStateAction<boolean>>) {
  const queryClient = useQueryClient();

  const form = useForm<CreateTodo>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: '',
      dueDate: undefined,
      memo: '',
      isPrior: false,
      isComplete: false
    }
  });

  const mutation = useMutation({
    mutationFn: (formData: CreateTodo) => todoApi.createTodo(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setIsVisible(false);
      form.reset();
    }
  });

  const onSubmit = (formData: CreateTodo) => {
    mutation.mutate(formData);
  };

  useEffect(() => {
    if (!isVisible) {
      form.reset();
    }
  }, [form, isVisible]);

  return { form, onSubmit };
}
