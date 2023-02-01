import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { useRouter } from "next/router";
import React from "react";
import Layout from "../../src/components/layout/Layout";
import Loader from "../../src/components/structureShared/Loader";
import PostContent from "../../src/components/profil/PostContent";

import TeamMembersList from "../../src/components/leftBar/Shared/TeamMembersList";
import { useAuth } from "../../src/context/UserContext";

import {
  categoryFetcher,
  postFetcher,
  teamFetcher,
  userFetcher,
} from "../../src/utils/fetcher";
import PersonalInfos from "../../src/components/profil/PersonalInfos";
import TeamMembersListUsers from "../../src/components/profil/TeamMembersListUsers";

function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const { user: userConnected } = useAuth();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery(["users", `user-${id}`], () => userFetcher.getOne(`${id}`));

  const { data: team } = useQuery(["teams", `user-${user?.teamId}`], () =>
    teamFetcher.getOne(`${user?.teamId}`)
  );
  const { data: categories } = useQuery(["categories", `user-${id}`], () =>
    categoryFetcher.getAllByUser(`${id}`)
  );

  const { data: posts } = useQuery(["posts"], () =>
    postFetcher.getAllPostUserConnected()
  );

  if (!user || !userConnected || !team || isLoading) {
    return <Loader />;
  }

  if (error) {
    <p>Error</p>;
  }

  console.log(id);

  return (
    <div className="w-full">
      <div className="bg-background-enedis w-[95%] m-auto mt-5  pb-10 lg:flex lg:justify-between lg:w-[80%]">
        <PersonalInfos
          id={id}
          team={team}
          userConnected={userConnected}
          user={user}
        />
        {userConnected?.id === id ? (
          <div>
            <div className="flex lg:w-[60%]">
              <div className="w-1/2 flex flex-col items-center pt-4 pl-4">
                <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
                  Mon équipe
                </h3>
                <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis lg:w-[80%] mb-5" />
                <div className=" pl-12">
                  <TeamMembersList />
                </div>
              </div>

              <div className="w-1/2 flex flex-col items-center pt-4 pb-4">
                <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
                  Mes catégories
                </h3>
                <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis lg:w-[80%]" />
                <ul className="mt-5 space-y-2">
                  {categories?.map((category) =>
                    category.ownerId === user.id ? (
                      <div className="flex " key={category.id}>
                        <li className="border text-mob-sm(multiuse) lg:text-desk-lg(titlePubli+multiuse) border-blue-enedis rounded-full h-[30px] w-fit px-2 flex-all-center">
                          {category.name}
                        </li>

                        <Image
                          src="/assets/Group 87.png"
                          width={30}
                          height={30}
                          alt="owner"
                          className="h-[30px] w-[30px] -ml-1"
                        />
                      </div>
                    ) : (
                      <li
                        className="border border-blue-enedis rounded-full h-[30px] w-fit px-2 flex-all-center truncate text-mob-sm(multiuse) lg:text-desk-lg(titlePubli+multiuse)"
                        key={category.id}
                      >
                        {category.name}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div className=" flex flex-col items-center pt-4 pb-4a w-full">
              <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
                Mon activité
              </h3>
              <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis" />
            </div>
            <div className=" flex flex-col items-center pt-4 pb-4a w-full">
              <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
                Mes dernières publications
              </h3>
              <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis" />

              {posts?.map((post) => (
                <PostContent post={post} key={post.id} />
              ))}
            </div>
          </div>
        ) : (
          <div className="">
            <div className="flex lg:w-[60%]">
              <div className="w-1/2 flex flex-col items-center pt-4 pl-4">
                <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
                  Son équipe
                </h3>
                <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis lg:w-[80%] mb-5" />
                <div className=" pl-12">
                  <TeamMembersListUsers user={user} />
                </div>
              </div>

              <div className="w-1/2 flex flex-col items-center pt-4 pb-4">
                <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
                  Ses catégories
                </h3>
                <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis lg:w-[80%]" />
                <ul className="mt-5 space-y-2">
                  {categories?.map((category) =>
                    category.ownerId === user.id ? (
                      <div className="flex ">
                        <li
                          className="border text-mob-sm(multiuse) lg:text-desk-lg(titlePubli+multiuse) border-blue-enedis rounded-full h-[30px] w-fit px-2 flex-all-center"
                          key={category.id}
                        >
                          {category.name}
                        </li>

                        <Image
                          src="/assets/Group 87.png"
                          width={30}
                          height={30}
                          alt="owner"
                          className="h-[30px] w-[30px] -ml-1"
                        />
                      </div>
                    ) : (
                      <li
                        className="border border-blue-enedis rounded-full h-[30px] w-fit px-2 flex-all-center truncate text-mob-sm(multiuse) lg:text-desk-lg(titlePubli+multiuse)"
                        key={category.id}
                      >
                        {category.name}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div className=" flex flex-col items-center pt-4 pb-4a w-full">
              <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
                Son activité
              </h3>
              <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis" />
            </div>
            <div className=" flex flex-col items-center pt-4 pb-4a w-full">
              <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
                Ses dernières publications en commun
              </h3>
              <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Profile.getLayout = (page: never) => <Layout sideBar>{page}</Layout>;

export default Profile;
