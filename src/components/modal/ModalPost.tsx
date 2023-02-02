/* eslint-disable @typescript-eslint/no-explicit-any */
import useOnClickOutside from "@jidayyy/useonclickoutside";
import { forwardRef, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { useModalContext } from "../../context/ModalContext";
import { TCategory, TSpace } from "../../types/main";

interface Iprops {
  Opener: ({ onClick }: any) => React.ReactElement;
  Content: ({ handleClose }: any) => JSX.Element;
  dataSpace?: TSpace;
  dataCategory?: TCategory;
}

interface Props {
  children: ReactNode;
}

const ModalBody = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return createPortal(
    <div className="fixed h-screen w-screen flex justify-center align-middle items-center bg-opacity-90 bg-dark-enedis top-0 left-0 z-[100]">
      <div
        ref={ref}
        className="w-[90%] h-fit p-5 max-h-[90%] rounded-app-bloc bg-background-enedis mb-20 md:w-1/2"
      >
        {children}
      </div>
    </div>,
    document.body
  );
});

export default function ModalPost({
  Opener,
  Content,
  dataSpace,
  dataCategory,
}: Iprops) {
  const modalContext = useModalContext();
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => modalContext?.handleClose());

  if (typeof window === "undefined") return null;

  return (
    <>
      <Opener onClick={modalContext?.handleOpen} />
      {modalContext?.isOpen && (
        <ModalBody ref={ref}>
          <Content dataSpace={dataSpace} dataCategory={dataCategory} />
        </ModalBody>
      )}
    </>
  );
}
