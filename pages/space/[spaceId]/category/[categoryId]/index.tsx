import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import CreateCategory from "../../../../../src/components/categories/createCategory/CreateCategory";
import BigHeaderCategory from "../../../../../src/components/categories/structure/BigHeaderCategory";
import Layout from "../../../../../src/components/layout/Layout";
import LeftBarCategory from "../../../../../src/components/leftBar/inCategory/LeftBarCategory";
import ModalCategory from "../../../../../src/components/modal/ModalCategory";
import CtaTextArea from "../../../../../src/components/posts/HeaderPublication/CtaTextArea";
import Loader from "../../../../../src/components/structureShared/Loader";
import { categoryFetcher } from "../../../../../src/utils/fetcher";

import { NextPageWithLayout } from "../../../../_app";

const category: NextPageWithLayout = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const {
    data: dataCategory,
    error: errorCategory,
    isLoading: isLoadingCategory,
  } = useQuery(["theCategory", categoryId], () =>
    categoryFetcher.getOneWithSpace(categoryId as string)
  );

  if (isLoadingCategory || !dataCategory) return <Loader />;
  if (errorCategory) return <div>Une erreur s&apos;est produite</div>;

  return (
    <div className="w-full">
      <div className="w-full h-full flex-x-center bg-white-enedis">
        <BigHeaderCategory dataCategory={dataCategory} />
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
              {/* <FeedGeneral dataSpace={dataCategory} /> */}
            </div>
          </div>
          <div className="hidden w-[40%] h-full bg-green-enedis lg:flex-x-center">
            {/* <NewsCategory dataSpace={dataCategory} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

category.getLayout = (page) => (
  <Layout sideBar={<LeftBarCategory />}>{page}</Layout>
);

export default category;
