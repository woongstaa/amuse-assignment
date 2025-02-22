// import { Moon, Sun } from 'lucide-react';
// import { useTheme } from '../apps/ThemeProvider';
import { useState } from 'react';
import { Input } from '../shared/ui/Input';
import { Button } from '../shared/ui/Button';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router';

export function Top() {
  // const { theme, setTheme } = useTheme();

  // console.log('THEME :::', theme);

  return (
    <nav className='w-full'>
      <SearchKeyword />
      <div></div>
    </nav>
  );
}

function SearchKeyword() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  return (
    <div className='flex h-[10%] py-4'>
      <Input placeholder='검색할 키워드를 입력해주세요' className='w-full' onChange={(event) => setKeyword(event.target.value)} />
      <div className='w-4' />
      <Button onClick={() => navigate(`/${keyword}`)}>
        <Search />
      </Button>
    </div>
  );
}
