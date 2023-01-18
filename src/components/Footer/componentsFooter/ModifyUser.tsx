import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useForm, FormProvider } from "react-hook-form";
import { userFetcher } from "../../../utils/fetcher";
import { TUser } from "../../../types/main";
import PermissionsRadio from "./PermissionsRadio";

const inputName = ["read", "write", "publish", "handle"];

type HandleOpenModifyUser = {
  HandleOpenModifyUser: () => void;
};

function ModifyUser({ HandleOpenModifyUser }: HandleOpenModifyUser) {
  const methods = useForm();

  const {
    isLoading,
    error,
    data: Alluser,
  } = useQuery(["getAllUser"], () => userFetcher.getAll());

  if (isLoading || !Alluser) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <p>Sorry something went wrong</p>;
  }

  const onSubmit = (data: any) => {
    HandleOpenModifyUser();
    console.log(data);
  };

  return (
    <div className="bg-green-enedis w-screen h-full p-2 ">
      <div className="bg-background-enedis flex-all-center rounded-app-bloc w-full p-2">
        <div className="flex justify-end w-full">
          <div className="flex flex-row space-x-4 my-3">
            <Image
              src="/logo_enedis/logo_vue.svg"
              alt="logo de vue"
              width={10}
              height={10}
              className="h-6 w-6"
            />
            <Image
              src="/logo_enedis/logo_comment.svg"
              alt="logo de commentaires"
              width={10}
              height={10}
              className="h-6 w-6"
            />
            <Image
              src="/logo_enedis/logo_publish.svg"
              alt="logo de publication"
              width={10}
              height={10}
              className="h-6 w-6"
            />
            <Image
              src="/logo_enedis/logo_handle.svg"
              alt="logo roue cranter"
              width={10}
              height={10}
              className="h-5 w-5"
            />
          </div>
        </div>
        <FormProvider {...methods}>
          <div className=" w-full">
            <table className="w-full">
              {Alluser.map((user: TUser) => (
                <tr className="w-full">
                  <div className="flex justify-between align-middle items-center w-full">
                    <div className=" flex justify-center items-center overflow-hidden mb-2 mr-2">
                      <div className="w-[30px] min-w-[30px] h-[30px] relative rounded-full overflow-hidden -mr-3">
                        <Image
                          alt={`${
                            user.firstname
                          } ${user.lastname.toUpperCase()}`}
                          src={user.imageUrl}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="w-fit max-w-[calc(100%-18px)] rounded-full border border-blue-enedis bg-blue-enedis px-4 py-[6px]">
                        <p className="text-mob-xs(textPost) text-white-enedis text-center truncate scrollbar-hide hover:text-clip hover:overflow-x-visible md:text-desk-sm(textPost+multiuse)">
                          {user.firstname} {user.lastname.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <PermissionsRadio user={user} inputName={inputName} />
                  </div>
                </tr>
              ))}
            </table>
            <button
              onClick={methods.handleSubmit(onSubmit)}
              type="button"
              className="text-white-enedis bg-green-enedis rounded-full px-2 h-10 w-28 text-mob-md(CTA+input) font-bold"
            >
              Je valide
            </button>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}

export default ModifyUser;
