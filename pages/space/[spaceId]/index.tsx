import React from "react";
import Layout from "../../../src/components/layout/Layout";
import { NextPageWithLayout } from "../../_app";

const index: NextPageWithLayout = () => {
  return <div>index</div>;
};
index.getLayout = (page) => <Layout>{page}</Layout>;

export default index;
