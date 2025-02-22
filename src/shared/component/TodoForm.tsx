import { Path, UseFormReturn } from 'react-hook-form';
import { Button } from '@/shared/ui/Button';
import { Todo, CreateTodo } from '@/entities/todoApi';
import { FormInput } from './FormInput';
import { FormDatepicker } from './FormDatepicker';
import { FormSelect } from './FormSelect';
import { FormWrapper } from './FormWrapper';

export function TodoForm<T extends Todo | CreateTodo>({
  form, //
  onSubmit,
  setIsVisible,
  type
}: {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'add' | 'edit';
}) {
  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <FormInput //
        control={form.control}
        name={'title' as Path<T>}
        label='할 일'
        placeholder='할 일을 입력하세요'
        description='할 일을 1자 이상 입력해주세요'
      />
      <div className='h-4' />
      <FormInput //
        control={form.control}
        name={'memo' as Path<T>}
        label='메모'
        placeholder='메모 내용을 입력하세요'
        description='메모를 자유롭게 작성해주세요'
      />
      <div className='h-4' />
      <FormDatepicker //
        control={form.control}
        name={'dueDate' as Path<T>}
        label='만료일'
        description='만료일을 선택해주세요'
      />
      <div className='h-4' />
      <FormSelect //
        control={form.control}
        name={'priority' as Path<T>}
        label='우선순위'
        placeholder='우선순위를 선택해주세요'
        description='우선순위를 선택해주세요'
        options={[
          { label: '없음', value: '0' },
          { label: '낮음', value: '1' },
          { label: '중간', value: '2' },
          { label: '높음', value: '3' }
        ]}
      />
      <div className='h-8' />
      <div className='flex justify-between gap-2'>
        <Button variant={'outline'} onClick={() => setIsVisible(false)}>
          취소
        </Button>
        <Button type='submit'>{type === 'add' ? '추가하기' : '수정하기'}</Button>
      </div>
    </FormWrapper>
  );
}
