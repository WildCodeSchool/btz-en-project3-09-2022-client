import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import BigHeaderCategory from "../../../../../src/components/categories/structure/BigHeaderCategory";
import FeedCategory from "../../../../../src/components/categories/structure/feedCategory/FeedCategory";
import Layout from "../../../../../src/components/layout/Layout";
import LeftBarCategory from "../../../../../src/components/leftBar/inCategory/LeftBarCategory";
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
    <div className="w-full md:max-w-[75%]">
      <div className="w-full h-full flex-x-center bg-white-enedis">
        <BigHeaderCategory dataCategory={dataCategory} />
        <div className="w-full h-full flex justify-between items-start px-3 py-5 md:p-10">
          <FeedCategory dataCategory={dataCategory} />
        </div>
      </div>
    </div>
  );
};

category.getLayout = (page) => (
  <Layout sideBar={<LeftBarCategory />}>{page}</Layout>
);

export default category;
