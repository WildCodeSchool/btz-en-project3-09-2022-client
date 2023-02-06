import React, { createContext, ReactNode, useContext, useState } from "react";

interface TModalContextMembers {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

interface IProps {
  children: ReactNode;
}

const ModalContextMembers = createContext<TModalContextMembers | null>(null);

export function ModalWrapperMembers({ children }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ModalContextMembers.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ isOpen, handleOpen, handleClose }}
    >
      {children}
    </ModalContextMembers.Provider>
  );
}

export function useModalContextMembers() {
  return useContext(ModalContextMembers);
}
