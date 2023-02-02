import React from "react";

type Props = { action: () => void; text: string };

function CTAWhite({ action, text }: Props) {
  return (
    <button
      type="button"
      onClick={action}
      className="w-fit max-w-full rounded-full bg-white-enedis text-green-enedis text-mob-md(CTA+input) px-5 py-4
      md:py-3 md:px-5 md:text-desk-lg(CTA+input)"
    >
      {text}
    </button>
  );
}

export default CTAWhite;
