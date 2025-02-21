import { ReactNode } from 'react';
import { UseFormReturn, FieldValues, SubmitHandler } from 'react-hook-form';
import { Form } from '../ui/form';

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  className?: string;
}

export function FormWrapper<T extends FieldValues>({ form, onSubmit, children, className }: Props<T>) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </Form>
  );
}
