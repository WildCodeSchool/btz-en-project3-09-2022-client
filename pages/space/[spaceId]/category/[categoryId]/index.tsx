import React from "react";
import Layout from "../../../../../src/components/layout/Layout";
import { NextPageWithLayout } from "../../../../_app";

const indexCategory: NextPageWithLayout = () => {
  return <div>indexCategory</div>;
};

indexCategory.getLayout = (page) => <Layout>{page}</Layout>;

export default indexCategory;
