import React, { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextSpaceType {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

interface IProps {
  children: ReactNode;
}

const ModalContextSpace = createContext<ModalContextSpaceType | null>(null);

export function ModalWrapperSpace({ children }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ModalContextSpace.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ isOpen, handleOpen, handleClose }}
    >
      {children}
    </ModalContextSpace.Provider>
  );
}

export function useModalContextSpace() {
  return useContext(ModalContextSpace);
}
