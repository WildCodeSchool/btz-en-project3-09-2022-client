/* eslint-disable react/function-component-definition */
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { NextPageWithLayout } from "../../_app";
import Layout from "../../../src/components/layout/Layout";
import LeftBarSpace from "../../../src/components/leftBar/LeftBarSpace";
import { spaceFetcher } from "../../../src/utils/fetcher";
import BigHeaderSpace from "../../../src/components/spaces/structure/BigHeaderSpace";
import NewsCategory from "../../../src/components/spaces/structure/NewsCategory";
import FeedGeneral from "../../../src/components/spaces/structure/FeedGeneralSpace/FeedGeneral";
import Loader from "../../../src/components/Loader";
import CarouselCategory from "../../../src/components/carouselCategory/Carousel";

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
    <div className="w-full md:max-w-[75%]">
      <div className="w-full h-full flex-x-center bg-white-enedis">
        <BigHeaderSpace dataSpace={dataSpace} />
        <CarouselCategory />
        <div className="w-full h-full flex justify-between items-start">
          <div className="w-full flex-x-center lg:w-[60%]">
            <div className="w-[95%] md:w-[91%] mb-2">
              <FeedGeneral dataSpace={dataSpace} />
            </div>
          </div>
          <NewsCategory />
        </div>
      </div>
    </div>
  );
};

Espace.getLayout = (page) => <Layout sideBar={<LeftBarSpace />}>{page}</Layout>;

export default Espace;
