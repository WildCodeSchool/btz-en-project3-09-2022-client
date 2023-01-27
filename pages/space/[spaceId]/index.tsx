/* eslint-disable react/function-component-definition */
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import ListSpaceCardsForHP from "../../../src/components/spaces/ListSpaceCardsForHP";
import TitleSection from "../../../src/components/structure/TitleSection";
import { NextPageWithLayout } from "../../_app";
import Layout from "../../../src/components/layout/Layout";
import LeftBarSpace from "../../../src/components/leftBar/LeftBarSpace";
import { spaceFetcher } from "../../../src/utils/fetcher";
import BigHeaderSpace from "../../../src/components/spaces/structure/BigHeaderSpace";
import SpacePublicationFirstArea from "../../../src/components/spaces/structure/SpacePublicationFirstArea";

const Espace: NextPageWithLayout = () => {
  const router = useRouter();
  const { spaceId } = router.query;

  const {
    data: dataSpace,
    error: errorSpace,
    isLoading: isLoadingSpace,
  } = useQuery([`theSpace`, spaceId], () =>
    spaceFetcher.getOne(spaceId as string)
  );

  if (isLoadingSpace || !dataSpace) return <div>En chargement</div>;
  if (errorSpace) return <div>Une erreur s&apos;est produite</div>;

  return (
    <div className="w-screen">
      <div className="w-full flex-x-center bg-white-enedis h-full">
        <BigHeaderSpace dataSpace={dataSpace} />
        <div className="flex justify-between items-start">
          <div className="w-[60%] flex-x-center">
            <div className="w-[95%] md:w-[91%] mb-2">
              <SpacePublicationFirstArea dataSpace={dataSpace} />
              <TitleSection
                titleText={`À la Une sur l'espace
          ${dataSpace.name}`}
              />
              <ListSpaceCardsForHP />
            </div>
          </div>
          <div className="w-[40%] h-full bg-green-enedis">
            <TitleSection titleText="News de mes catégories" whiteText />
          </div>
        </div>
      </div>
    </div>
  );
};

Espace.getLayout = (page) => <Layout sideBar={<LeftBarSpace />}>{page}</Layout>;

export default Espace;
