import React from "react";

function PublicationFirstArea() {
  return (
    <div className="flex justify-between mt-6">
      <div className="w-1/4 min-w-[110px] max-w-[200px] h-24 bg-blue-enedis rounded-app-bloc flex-all-center p-3">
        <p className="text-mob-md(CTA+input) font-enedis font-bold text-white-enedis">
          Envie de partager à tous ?
        </p>
      </div>
      <div className="w-full bg-background-enedis ml-2 p-3">
        <div className="h-full w-full flex-all-center bg-white-enedis rounded-app-bloc p-4">
          <button
            type="button"
            onClick={() => console.log("bonjour")}
            className="w-full h-full text-mob-sm(multiuse) font-publicSans font-regular text-start"
          >
            Dites-en plus...
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublicationFirstArea;
