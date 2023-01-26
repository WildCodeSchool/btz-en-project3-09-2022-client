/* eslint-disable react/function-component-definition */
import PublicationFirstArea from "../src/components/posts/HeaderPublication/PublicationFirstArea";
import ListSpaceCardsForHP from "../src/components/spaces/ListSpaceCardsForHP";
import HeaderHP from "../src/components/structure/HeaderHP";
import TitleSection from "../src/components/structure/TitleSection";
import LeftBar from "../src/components/leftBar/leftBar";
import { NextPageWithLayout } from "./app/_app";
import Layout from "../src/components/layout/Layout";
import CommentList from "../src/components/comments/commentList";

const Home: NextPageWithLayout = () => {
  const postId = "5d603f90-ab0b-4ec2-99cf-01c6b768232d";

  return (
    <div className="w-screen">
      <div className="w-full flex-x-center">
        <HeaderHP />
        <div className="w-[95%] md:w-[91%]">
          <PublicationFirstArea />
          <TitleSection titleText="À la Une sur mes espaces" />
          <ListSpaceCardsForHP />
          <CommentList postId={postId} />
        </div>
      </div>
    </div>
  );
};

Home.getLayout = (page) => <Layout sideBar={<LeftBar />}>{page}</Layout>;

export default Home;
