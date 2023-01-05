import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface IProps {
  isShowing: boolean;
  hide: () => void;
  children: ReactNode;
}

function Modal({ isShowing, hide, ...props }: IProps) {
  return isShowing
    ? ReactDOM.createPortal(
        <div className="  top-0 left-0   w-full h-full overflow-x-hidden overflow-y-auto outline-none">
          <div className=" absolute right-3 top-28 rounded-xl   h-[150px] w-[168px] bg-bleu p-5 ">
            <div className="flex justify-between  " />
            <div className="modal-body ">{props.children}</div>
          </div>
        </div>,

        document.body
      )
    : null;
}

export default Modal;
