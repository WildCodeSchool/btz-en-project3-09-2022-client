import { useWindowSize } from "usehooks-ts";
import PublicationFirstArea from "../src/components/posts/HeaderPublication/PublicationFirstArea";
import ListSpaceCardsForHP from "../src/components/spaces/ListSpaceCardsForHP";
import HeaderHP from "../src/components/structure/HeaderHP";
import TitleSection from "../src/components/structure/TitleSection";
import LeftBar from "../src/components/leftBar/leftBar";
import Footer from "../src/components/footer";

export default function Home() {
  const { width } = useWindowSize();

  return (
    <div className="w-screen">
      <div className={`w-full h-full ${width >= 768 && "flex"}`}>
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
      <div className="absolute bottom-0 w-full">
        {width < 768 && <Footer />}
      </div>
    </div>
  );
}
