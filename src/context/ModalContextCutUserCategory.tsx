import React, { createContext, ReactNode, useContext, useState } from "react";

interface TModalContextMembers {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

interface IProps {
  children: ReactNode;
}

const ModalContextCutMembers = createContext<TModalContextMembers | null>(null);

export function ModalWrapperCutMembers({ children }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ModalContextCutMembers.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ isOpen, handleOpen, handleClose }}
    >
      {children}
    </ModalContextCutMembers.Provider>
  );
}

export function useModalContextMembers() {
  return useContext(ModalContextCutMembers);
}
