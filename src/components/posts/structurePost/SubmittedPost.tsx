import React from "react";
import { useModalContext } from "../../../context/ModalContext";

function SubmittedPost() {
  const modalContext = useModalContext();

  return (
    <div className="w-full h-40 flex-all-center items-center">
      <div className="h-16 w-16 flex-all-center rounded-full bg-green-enedis text-mob-4xl(welcomeConnect) text-white-enedis">
        ✓
      </div>
      <p className="text-mob-lg(multiuse) mt-6">Le post a bien été publié !</p>
      <button
        type="button"
        onClick={modalContext?.handleClose}
        className="absolute left-0 top-0 font-regular font-publicSans text-mob-sm(multiuse)"
      >
        <span className="mr-2">╳</span> Je ferme
      </button>
    </div>
  );
}

export default SubmittedPost;
