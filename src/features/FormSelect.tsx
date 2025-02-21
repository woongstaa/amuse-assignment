import { FormDescription } from '../shared/ui/Form';
import { SelectContent } from '../shared/ui/Select';
import { SelectValue } from '../shared/ui/Select';
import { SelectTrigger } from '../shared/ui/Select';
import { SelectItem } from '../shared/ui/Select';
import { FormControl } from '../shared/ui/Form';

import { FormField, FormItem, FormLabel, FormMessage } from '../shared/ui/Form';
import { Select } from '../shared/ui/Select';
import { Control, FieldValues, Path } from 'react-hook-form';
import { cn } from '../shared/lib/utils';

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
