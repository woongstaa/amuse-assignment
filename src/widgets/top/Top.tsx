// import { Moon, Sun } from 'lucide-react';
// import { useTheme } from '../apps/ThemeProvider';
import { useState } from 'react';
import { Input } from '../../shared/ui/Input';
import { Button } from '../../shared/ui/Button';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { Filters } from './Filters';

export function Top() {
  return (
    <nav className='w-full h-[10%]'>
      <SearchKeyword />
      <Filters />
    </nav>
  );
}

function SearchKeyword() {
  const [keyword, setKeyword] = useState('');
  const [_, setSearchParams] = useSearchParams();

  const handleSearch = () => {
    setSearchParams({ q: keyword });
  };

  return (
    <div className='flex py-4'>
      <Input
        placeholder='검색할 키워드를 입력해주세요'
        className='w-full'
        onChange={(event) => {
          setKeyword(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <div className='w-4' />
      <Button onClick={handleSearch}>
        <Search />
      </Button>
    </div>
  );
}
