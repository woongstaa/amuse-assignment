import { Button } from '../shared/ui/Button';

export function Bottom({ setModalVisible }: { setModalVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className='flex justify-end py-4'>
      <Button onClick={() => setModalVisible(true)}>할 일 추가하기</Button>
    </div>
  );
}
