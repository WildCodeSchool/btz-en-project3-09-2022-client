/* eslint-disable @typescript-eslint/no-explicit-any */
import useOnClickOutside from "@jidayyy/useonclickoutside";
import { forwardRef, ReactNode, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Iprops {
  Opener: ({ onClick }: any) => React.ReactElement;
  Content: () => JSX.Element;
}

interface Props {
  children: ReactNode;
}

const ModalBody = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return createPortal(
    <div className="fixed h-screen w-screen flex justify-center align-middle items-center bg-opacity-90 bg-dark-enedis top-0 left-0">
      <div
        ref={ref}
        className="w-[90%] p-5 rounded-app-bloc bg-background-enedis"
      >
        {children}
      </div>
    </div>,
    document.body
  );
});

export default function ModalPost({ Opener, Content }: Iprops) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useOnClickOutside(ref, () => handleClose());

  if (typeof window === "undefined") return null;

  return (
    <>
      <Opener onClick={handleOpen} />
      {isOpen && (
        <ModalBody ref={ref}>
          <Content />
        </ModalBody>
      )}
    </>
  );
}
