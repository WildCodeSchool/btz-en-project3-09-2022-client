import React from "react";

function Footer() {
  return (
    <div className="bg-bleu flex justify-around p-1 w-full">
      <img
        src="/logo_enedis/enedis-home.png"
        alt="logo homepage"
        className="w-1/12 h-1/2"
      />
      <img
        src="/logo_enedis/enedis-espace.png"
        alt="logo carte des espaces"
        className="w-1/12"
      />
      <img
        src="/logo_enedis/enedis-category.png"
        alt="logo choix categories"
        className="w-1/12"
      />
      <img
        src="/logo_enedis/enedis-notifications.png"
        alt="logo des notifications"
        className="w-1/12"
      />
    </div>
  );
}

export default Footer;
