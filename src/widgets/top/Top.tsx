import { Filters } from './Filters';
import { SearchKeyword } from './SearchKeyword';

export function Top() {
  return (
    <nav className='w-full h-[15%] sm:h-[10%]'>
      <SearchKeyword />
      <div className='h-2' />
      <Filters />
    </nav>
  );
}
