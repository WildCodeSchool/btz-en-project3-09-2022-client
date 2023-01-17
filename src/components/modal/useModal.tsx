import { useState } from "react";

function useModal() {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };
  return {
    isShowing,
    toggle,
  };
}

export default useModal;
