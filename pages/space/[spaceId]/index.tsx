/* eslint-disable react/function-component-definition */
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { NextPageWithLayout } from "../../_app";
import Layout from "../../../src/components/layout/Layout";
import LeftBarSpace from "../../../src/components/leftBar/inSpace/LeftBarSpace";
import { spaceFetcher } from "../../../src/utils/fetcher";
import BigHeaderSpace from "../../../src/components/spaces/structure/BigHeaderSpace";
import NewsCategory from "../../../src/components/spaces/structure/newsCategory/NewsCategory";
import FeedGeneral from "../../../src/components/spaces/structure/FeedGeneralSpace/FeedGeneral";
import Loader from "../../../src/components/structureShared/Loader";
import ModalCategory from "../../../src/components/modal/ModalCategory";
import CtaTextArea from "../../../src/components/categories/createCategory/CTA";
import CreateCategory from "../../../src/components/categories/createCategory/CreateCategory";

const Espace: NextPageWithLayout = () => {
  const router = useRouter();
  const { spaceId } = router.query;

  const {
    data: dataSpace,
    error: errorSpace,
    isLoading: isLoadingSpace,
  } = useQuery(["theSpaceWithCategories", spaceId], () =>
    spaceFetcher.getOneWithCategories(spaceId as string)
  );

  if (isLoadingSpace || !dataSpace) return <Loader />;
  if (errorSpace) return <div>Une erreur s&apos;est produite</div>;

  return (
    <div className="w-screen">
      <div className="w-full h-full flex-x-center bg-white-enedis">
        <BigHeaderSpace dataSpace={dataSpace} />
        <div className="hidden w-full h-36 p-5 text-white-enedis bg-background-enedis md:flex md:items-center">
          <div className="w-1/5 min-w-[155px] flex-all-center mr-4">
            <ModalCategory Opener={CtaTextArea} Content={CreateCategory} />
          </div>
          <div className="w-4/5 h-full bg-redError-enedis flex-all-center">
            carousel choix catégorie à venir (Damien)
          </div>
        </div>
        <div className="w-full h-full flex justify-between items-start">
          <div className="w-full flex-x-center lg:w-[60%]">
            <div className="w-[95%] md:w-[91%] mb-2">
              <FeedGeneral dataSpace={dataSpace} />
            </div>
          </div>
          <div className="hidden w-[40%] h-full bg-green-enedis lg:flex-x-center">
            <NewsCategory dataSpace={dataSpace} />
          </div>
        </div>
      </div>
    </div>
  );
};

Espace.getLayout = (page) => <Layout sideBar={<LeftBarSpace />}>{page}</Layout>;

export default Espace;
