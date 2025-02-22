import { Filters } from './Filters';
import { SearchKeyword } from './SearchKeyword';

export function Top() {
  return (
    <nav className='w-full h-[10%]'>
      <SearchKeyword />
      <Filters />
    </nav>
  );
}
