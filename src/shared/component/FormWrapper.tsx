import { ReactNode } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { Form } from '@/shared/ui/Form';

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (formData: T) => void;
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
