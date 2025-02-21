export function Bottom({ setModalVisible }: { setModalVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className='flex justify-end py-4'>
      <button onClick={() => setModalVisible(true)}>할 일 추가하기</button>
    </div>
  );
}
