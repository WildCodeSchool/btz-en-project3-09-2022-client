import React from "react";

type Props = { action: () => void };

function CTA({ action }: Props) {
  return (
    <button
      type="button"
      onClick={action}
      className="w-fit max-w-full rounded-full bg-green-enedis"
    >
      Voir mon profil
    </button>
  );
}

export default CTA;
