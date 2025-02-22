import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/Button';
import { Calendar } from '@/shared/ui/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/Popover';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/shared/ui/Form';

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
}

export function FormDatepicker<T extends FieldValues>({ control, name, label, description }: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col w-full'>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant={'outline'} className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                  {field.value ? format(field.value, 'yyyy년 MM월 dd일') : <span>날짜를 선택해주세요</span>}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-full p-0' align='start'>
              <Calendar //
                mode='single'
                selected={field.value || undefined}
                onSelect={(date) => {
                  field.onChange(date || undefined);
                }}
                disabled={(date) => date <= new Date() || date < new Date('1900-01-01')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
