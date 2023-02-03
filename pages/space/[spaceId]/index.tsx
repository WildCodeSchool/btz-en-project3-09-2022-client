/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import CarouselCategory from "../../../src/components/spaces/structure/carouselCategory/CarouselCategory";
import { TSpace } from "../../../src/types/main";

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

  const { categories } = dataSpace as TSpace;

  const checkIfCategoryExceptGeneral = () => {
    if (
      categories!.length === 0 ||
      (categories!.length === 1 &&
        categories![0]!.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") === "general")
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="w-full md:max-w-[75%]">
      <div className="w-full h-full flex-x-center  bg-white-enedis">
        <BigHeaderSpace dataSpace={dataSpace} />
        <div className="flex flex-col-reverse justify-center items-center w-full h-[210px] min-h-[210px] p-5 text-white-enedis bg-background-enedis md:h-[140px] md:min-h-[140px] md:flex-row md:items-center">
          <div className="w-1/5 min-w-[155px] flex-all-center md:mr-4">
            <ModalCategory Opener={CtaTextArea} Content={CreateCategory} />
          </div>
          {!checkIfCategoryExceptGeneral() && (
            <div className="w-full h-full  flex-all-center md:w-2/3 ">
              <CarouselCategory dataSpace={dataSpace} />
            </div>
          )}
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
