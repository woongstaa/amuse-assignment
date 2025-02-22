import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Search } from 'lucide-react';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

export function SearchKeyword() {
  const [keyword, setKeyword] = useState('');
  const [_, setSearchParams] = useSearchParams();

  const handleSearch = () => {
    setSearchParams({ q: keyword });
  };

  return (
    <div className='flex'>
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
