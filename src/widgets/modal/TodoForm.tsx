import { FormInput } from '../../shared/component/FormInput';
import { FormDatepicker } from '../../shared/component/FormDatepicker';
import { FormSelect } from '../../shared/component/FormSelect';
import { Path, UseFormReturn } from 'react-hook-form';
import { FormWrapper } from '../../shared/component';
import { Todo, CreateTodo } from '../../entities/todoApi';

export function TodoForm<T extends Todo | CreateTodo>({
  form, //
  onSubmit,
  submitComponent
}: {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  submitComponent: React.ReactNode;
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
      <>{submitComponent}</>
    </FormWrapper>
  );
}
