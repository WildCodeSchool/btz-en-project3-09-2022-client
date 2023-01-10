import { useWindowSize } from "usehooks-ts";
import PublicationFirstArea from "../src/components/posts/PublicationFirstArea";
import ListSpaceCardsForHP from "../src/components/spaces/ListSpaceCardsForHP";
import HeaderHP from "../src/components/structure/HeaderHP";
import TitleSection from "../src/components/structure/TitleSection";
import LeftBar from "../src/components/leftBar/leftBar";
import Footer from "../src/components/footer";

export default function Home() {
  const { width } = useWindowSize();

  return (
    <div className={`w-full h-full ${width >= 768 && "flex"}`}>
      {width >= 768 && <LeftBar />}
      <div className="w-full">
        <HeaderHP />
        <PublicationFirstArea />
        <TitleSection titleText="À la Une sur mes espaces" />
        <ListSpaceCardsForHP />
      </div>
      <Footer />
    </div>
  );
}
