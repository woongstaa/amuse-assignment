import { Button } from '@/shared/ui/Button';

export function Bottom({ setAddModalVisible }: { setAddModalVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className='flex justify-end py-4'>
      <Button onClick={() => setAddModalVisible(true)}>할 일 추가하기</Button>
    </div>
  );
}
