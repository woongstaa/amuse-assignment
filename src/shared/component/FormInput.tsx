import { Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '@/shared/ui/Input';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/shared/ui/Form';

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  description?: string;
}

export function FormInput<T extends FieldValues>({ control, name, label, placeholder, description }: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input className='text-[14px]' placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
