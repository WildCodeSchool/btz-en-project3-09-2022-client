import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { useRouter } from "next/router";
import React from "react";

import Link from "next/link";
import Layout from "../../src/components/layout/Layout";
import Loader from "../../src/components/structureShared/Loader";
import PostContent from "../../src/components/profil/PostContent";
import TeamMembersList from "../../src/components/leftBar/Shared/TeamMembersList";
import PersonalInfos from "../../src/components/profil/PersonalInfos";
import TeamMembersListUsers from "../../src/components/profil/TeamMembersListUsers";
import { useAuth } from "../../src/context/UserContext";

import {
  categoryFetcher,
  postFetcher,
  userFetcher,
} from "../../src/utils/fetcher";

function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const { user: userConnected } = useAuth();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery(["users", `user-${id}`], () => userFetcher.getOne(`${id}`));

  const { data: categories } = useQuery(["categories", `user-${id}`], () =>
    categoryFetcher.getAllByUser(`${id}`)
  );

  const { data: posts } = useQuery(["posts"], () =>
    postFetcher.getAllPostsShared()
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <div>Veuillez vous connectez.</div>;
  }

  if (error) {
    <p>Error</p>;
  }

  return (
    <div className="w-full bg-background-enedis lg:bg-white-enedis">
      <div className="bg-background-enedis lg:m-auto lg:mb-5 lg:mt-5 p-5 pb-10 lg:w-2/3 lg:px-10 ">
        <PersonalInfos id={id} team={user.team} user={user} />
        {userConnected?.id === id ? (
          <div>
            <div className="flex ">
              <div className="w-1/2 flex flex-col items-center pt-4 pl-4">
                <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
                  Mon équipe
                </h3>
                <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis lg:w-[80%] mb-5" />
                <div className="w-[90%]">
                  <TeamMembersList />
                </div>
              </div>

              <div className="w-1/2 flex flex-col items-center pt-4 pb-4">
                <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
                  Mes catégories
                </h3>
                <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis lg:w-[80%]" />
                <ul className="mt-5 space-y-2">
                  {categories
                    ?.filter(
                      (category) =>
                        category.name
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "") !== "general"
                    )
                    .map((category) =>
                      category.ownerId === user.id ? (
                        <div className="flex " key={category.id}>
                          <Link
                            href={`/space/${category.spaceId}/category/${category.id}`}
                          >
                            <li className="border text-mob-xs(textPost) lg:text-desk-md(titlePubli+multiuse) border-blue-enedis rounded-full h-[30px] w-fit px-2 flex-all-center ">
                              {category.name}
                            </li>
                          </Link>

                          <Image
                            src="/assets/Group 87.png"
                            width={30}
                            height={30}
                            alt="owner"
                            className="h-[30px] w-[30px] -ml-1"
                          />
                        </div>
                      ) : (
                        <Link
                          href={`/space/${category.spaceId}/category/${category.id}`}
                        >
                          <div className="my-2">
                            <li
                              className="border border-blue-enedis rounded-full h-[30px] w-fit px-2 flex-all-center truncate text-mob-xs(textPost) lg:text-desk-md(titlePubli+multiuse)"
                              key={category.id}
                            >
                              {category.name}
                            </li>
                          </div>
                        </Link>
                      )
                    )}
                </ul>
              </div>
            </div>

            <div className=" flex flex-col w-full items-center pt-4 pb-4m-auto">
              <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
                Mes dernières publications
              </h3>
              <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis mb-5" />

              {posts &&
              posts.filter((post) => post.authorId === userConnected?.id)
                .length > 0 ? (
                posts
                  .filter((post) => post.authorId === userConnected?.id)
                  .map((post) => <PostContent post={post} key={post.id} />)
              ) : (
                <div className="flex items-center h-56 justify-center mt-4">
                  <div className="relative w-1/2 h-5/6">
                    <Image
                      src="/assets/icons/icon-eolien.png"
                      alt="Pas de post"
                      fill
                      className="object-scale-down object-center"
                    />
                  </div>
                  <div className="px-3">
                    <p className="mb-2">
                      Vous n&apos;avez pas encore de publication...
                      <br />
                      N&apos;hésitez pas à le faire !
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="">
            <div className="flex ">
              <div className="w-1/2 flex flex-col items-center pt-4 pl-4">
                <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
                  Son équipe
                </h3>
                <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis lg:w-[80%] mb-5" />
                <div className="w-[90%]">
                  <TeamMembersListUsers user={user} />
                </div>
              </div>

              <div className="w-1/2 flex flex-col items-center pt-4 pb-4">
                <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
                  Ses catégories
                </h3>
                <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis lg:w-[80%]" />
                <div className="w-[90%] ">
                  <ul className="mt-5 space-y-2">
                    {categories
                      ?.filter(
                        (category) =>
                          category.name
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "") !== "general"
                      )
                      .map((category) =>
                        category.ownerId === user.id ? (
                          <div className="flex " key={category.id}>
                            <Link
                              href={`/space/${category.spaceId}/category/${category.id}`}
                            >
                              <li
                                className="border text-mob-xs(textPost) lg:text-desk-lg(titlePubli+multiuse)  border-blue-enedis rounded-full h-[30px] w-fit px-2 flex-all-center"
                                key={category.id}
                              >
                                {category.name}
                              </li>
                            </Link>
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
                            className="border border-blue-enedis rounded-full h-[30px] w-fit px-2 flex-all-center truncate text-mob-xs(textPost) lg:text-desk-lg(titlePubli+multiuse)"
                            key={category.id}
                          >
                            <Link
                              href={`/space/${category.spaceId}/category/${category.id}`}
                            >
                              {category.name}
                            </Link>
                          </li>
                        )
                      )}
                  </ul>
                </div>
              </div>
            </div>

            <div className=" flex flex-col items-center mt-5 pt-4 pb-4 w-full">
              <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
                Ses dernières publications en commun
              </h3>
              <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis" />
              {posts &&
              posts.filter((post) => post.authorId === user.id).length > 0 ? (
                posts
                  .filter((post) => post.authorId === user.id)
                  .map((post) => <PostContent post={post} key={post.id} />)
              ) : (
                <div className="flex items-center h-56 justify-center mt-4">
                  <div className="relative w-1/2 h-5/6">
                    <Image
                      src="/assets/icons/icon-eolien.png"
                      alt="Pas de post"
                      fill
                      className="object-scale-down object-center"
                    />
                  </div>
                  <div className="px-3">
                    <p className="mb-2">
                      Vous n&apos;avez pas encore de publication en commun...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Profile.getLayout = (page: never) => <Layout sideBar>{page}</Layout>;

export default Profile;
