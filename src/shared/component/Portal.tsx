import { JSX } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: JSX.Element | false;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  backdropZIndex?: string;
}
export function Portal({ children, isVisible, setIsVisible, backdropZIndex }: Props) {
  if (typeof window === 'undefined') return null;

  const modalRoot = document.getElementById('modal-root');

  if (!isVisible) return null;
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className={`fixed w-dvw h-dvh bg-modal-backdrop top-0 animate-fade-backdrop ${backdropZIndex}`} onClick={() => setIsVisible(false)}>
      {children}
    </div>,
    modalRoot
  );
}
