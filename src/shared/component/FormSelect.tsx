import { FormDescription } from '../ui/Form';
import { SelectContent } from '../ui/Select';
import { SelectValue } from '../ui/Select';
import { SelectTrigger } from '../ui/Select';
import { SelectItem } from '../ui/Select';
import { FormControl } from '../ui/Form';

import { FormField, FormItem, FormLabel, FormMessage } from '../ui/Form';
import { Select } from '../ui/Select';
import { Control, FieldValues, Path } from 'react-hook-form';
import { cn } from '../lib/utils';

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  description?: string;
  options: { label: string; value: string }[];
}
export function FormSelect<T extends FieldValues>({ control, name, label, placeholder, description, options }: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={cn('text-foreground', !field.value && 'text-muted-foreground')}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option, index) => {
                return (
                  <SelectItem key={index} value={option.value}>
                    {option.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
