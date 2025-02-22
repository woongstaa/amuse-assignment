import { Button } from '@/shared/ui/Button';

export function Bottom({ setAddModalVisible }: { setAddModalVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className='flex justify-end h-[5%] items-end'>
      <Button onClick={() => setAddModalVisible(true)}>할 일 추가하기</Button>
    </div>
  );
}
