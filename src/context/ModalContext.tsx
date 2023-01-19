import React, { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

interface IProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalWrapper({ children }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ isOpen, handleOpen, handleClose }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  return useContext(ModalContext);
}
