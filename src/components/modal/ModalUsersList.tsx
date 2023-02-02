import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface IProps {
  isShowing: boolean;
  hide: () => void;
  children: ReactNode;
}

function ModalUsersList({ isShowing, hide, ...props }: IProps) {
  return isShowing
    ? ReactDOM.createPortal(
        <div className="  top-0 left-0   w-full h-full overflow-x-hidden overflow-y-auto outline-none ">
          <div className=" absolute top-14 left-[40%] transform -translate-x-1/2 rounded-app-bloc h-[150px] w-[23%]  bg-green-enedis p-5 font-enedis  ">
            <div className="flex justify-between  " />
            <div>{props.children}</div>
          </div>
        </div>,

        document.body
      )
    : null;
}

export default ModalUsersList;
