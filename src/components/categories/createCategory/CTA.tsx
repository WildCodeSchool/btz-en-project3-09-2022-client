interface IProps {
  onClick: () => void;
}

function CtaTextArea({ onClick }: IProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-fit w-fit rounded-full bg-green-enedis text-white-enedis text-mob-md(CTA+input) px-5 py-3
      md:py-3 md:px-5 md:text-desk-lg(CTA+input)"
    >
      Je crée <br className="hidden md:block" />
      une catégorie
    </button>
  );
}

export default CtaTextArea;
