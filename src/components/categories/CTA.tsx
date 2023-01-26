interface IProps {
  onClick: () => void;
}

function CtaTextArea({ onClick }: IProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-full w-full flex-all-center bg-green-enedis rounded-app-bloc p-4"
    >
      <p className="w-full text-mob-sm(multiuse) font-publicSans font-regular text-center text-white-enedis">
        Créer une catégorie
      </p>
    </button>
  );
}

export default CtaTextArea;
