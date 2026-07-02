import { Modal as ModalRoot } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';

type ModalComponent = typeof ModalRoot & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
};

const Modal = ModalRoot as ModalComponent;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export { Modal };
export type { ModalProps } from './Modal';
export type { ModalHeaderProps } from './ModalHeader';
export type { ModalBodyProps } from './ModalBody';
export type { ModalFooterProps } from './ModalFooter';
