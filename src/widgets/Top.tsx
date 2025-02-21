// import { Moon, Sun } from 'lucide-react';
// import { useTheme } from '../apps/ThemeProvider';
import { useState } from 'react';
import { Input } from '../shared/ui/input';
import { Button } from '../shared/ui/button';
import { Search } from 'lucide-react';

export function Top() {
  // const { theme, setTheme } = useTheme();

  // console.log('THEME :::', theme);

  return (
    <nav className='w-full'>
      <SearchKeyword />
      <div>
        {/* {theme === 'dark' && <Sun />}
        {theme === 'light' && <Moon />} */}
      </div>
    </nav>
  );
}

function SearchKeyword() {
  const [keyword, setKeyword] = useState('');

  return (
    <div className='flex h-[10%] py-4'>
      <Input placeholder='검색할 키워드를 입력해주세요' className='w-full' onChange={() => {}} />
      <div className='w-4' />
      <Button onClick={() => {}}>
        <Search />
      </Button>
    </div>
  );
}
