import { Portal } from '@/shared/component';
import { Card } from '@/shared/ui';

export function Container({
  isVisible, //
  setIsVisible,
  children
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  if (!isVisible) return null;

  return (
    <Portal isVisible={isVisible} setIsVisible={setIsVisible}>
      <div className='h-dvh flex justify-center items-center'>
        <Card className='w-5/6 sm:w-3/6 p-4 rounded-lg' onClick={(e) => e.stopPropagation()}>
          {children}
        </Card>
      </div>
    </Portal>
  );
}
