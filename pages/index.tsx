import { useRouter } from "next/router";
import { useWindowSize } from "usehooks-ts";
import Modal from "react-modal";
import PublicationFirstArea from "../src/components/posts/HeaderPublication/PublicationFirstArea";
import ListSpaceCardsForHP from "../src/components/spaces/ListSpaceCardsForHP";
import HeaderHP from "../src/components/structure/HeaderHP";
import TitleSection from "../src/components/structure/TitleSection";
import LeftBar from "../src/components/leftBar/leftBar";
import { useAuth } from "../src/context/UserContext";
import styleModalPost from "../styles/modalPost";

Modal.setAppElement("#__next");

export default function Home() {
  const { width } = useWindowSize();
  const router = useRouter();

  // if (!user) {
  //   return <div>en chargement (à remplacer par composant welcome)</div>;
  // }

  return (
    <div className="w-screen">
      <div className={`w-full h-full ${width >= 768 && "flex"}`}>
        <Modal
          isOpen={!!router.query.newpost}
          onRequestClose={() => router.push("/")}
          style={styleModalPost}
        >
          <div className="absolute z-50 w-1/2 h-1/2 bg-blue-enedis" />
        </Modal>
        {width >= 768 && <LeftBar />}
        <div className="w-full flex-x-center">
          <HeaderHP />
          <div className="w-[95%] md:w-[91%]">
            <PublicationFirstArea />
            <TitleSection titleText="À la Une sur mes espaces" />
            <ListSpaceCardsForHP />
          </div>
        </div>
      </div>
    </div>
  );
}
