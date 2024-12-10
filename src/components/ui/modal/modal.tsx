import { FC } from 'react';
import styles from './modal.module.css';
import { TModalProps } from '../../modal/modal';
import { CloseButton } from '../closeButton/closeButton';

export const ModalUI: FC<TModalProps> = ({ title, onClose, children }) => {
  return (
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <CloseButton className={styles.closeButton} onClose={onClose} />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <div className={styles.overlay} onClick={onClose}></div>
    </>
  );
};
