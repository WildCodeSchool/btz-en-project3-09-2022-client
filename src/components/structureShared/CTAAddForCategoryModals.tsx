import React from "react";

interface IProps {
  onClick: () => void;
}

function CTAAddForCategoryModals({ onClick }: IProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-fit max-w-full rounded-full bg-green-enedis text-white-enedis text-mob-md(CTA+input)
      md:py-3 md:px-[15px] md:text-desk-md(titlePubli+multiuse) lg:py-3 lg:px-5 lg:text-desk-lg(CTA+input)"
    >
      J&apos;ajoute
    </button>
  );
}

export default CTAAddForCategoryModals;
