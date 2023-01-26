import React, { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextCategoryType {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

interface IProps {
  children: ReactNode;
}

const ModalContextCategory = createContext<ModalContextCategoryType | null>(
  null
);

export function ModalWrapper({ children }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ModalContextCategory.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ isOpen, handleOpen, handleClose }}
    >
      {children}
    </ModalContextCategory.Provider>
  );
}

export function useModalContextCategory() {
  return useContext(ModalContextCategory);
}
