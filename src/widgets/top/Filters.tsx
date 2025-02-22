import { Button } from '@/shared/ui/Button';
import { useCallback } from 'react';
import { SetURLSearchParams, useSearchParams } from 'react-router';

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = [
    {
      label: '#전체',
      value: 'all'
    },
    {
      label: '#미완료',
      value: 'incomplete'
    },
    {
      label: '#완료',
      value: 'complete'
    },
    {
      label: '#우선순위_높음',
      value: 'priority_high'
    },
    {
      label: '#우선순위_보통',
      value: 'priority_medium'
    },
    {
      label: '#우선순위_낮음',
      value: 'priority_low'
    }
  ];

  const filterHandler = useCallback((value: string) => setQueryParams(value, setSearchParams), [setSearchParams]);

  return (
    <div className='flex flex-wrap gap-2 sm:justify-center'>
      {filter.map((item) => (
        <Button //
          key={item.value}
          variant={getFilterValue(searchParams) === item.value ? 'default' : 'outline'}
          size={'sm'}
          onClick={() => filterHandler(item.value)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}

export function getFilterValue(params: URLSearchParams) {
  const q = params.get('q');
  const isComplete = params.get('isComplete');
  const priority = params.get('priority');

  if (q) return 'all';
  if (isComplete === 'true') return 'complete';
  if (isComplete === 'false') return 'incomplete';
  if (priority === '3') return 'priority_high';
  if (priority === '2') return 'priority_medium';
  if (priority === '1') return 'priority_low';
  return 'all';
}

export function setQueryParams(value: string, setSearchParams: SetURLSearchParams) {
  switch (value) {
    case 'all':
      setSearchParams();
      break;
    case 'incomplete':
      setSearchParams({ isComplete: 'false' });
      break;
    case 'complete':
      setSearchParams({ isComplete: 'true' });
      break;
    case 'priority_high':
      setSearchParams({ priority: '3' });
      break;
    case 'priority_medium':
      setSearchParams({ priority: '2' });
      break;
    case 'priority_low':
      setSearchParams({ priority: '1' });
      break;
  }
}
