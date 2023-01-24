import React from "react";
import { useFormContext } from "react-hook-form";
import { TUser } from "../../../types/main";

type Props = {
  inputName: string[];
  user: TUser;
};

export default function PermissionsRadio({ inputName, user }: Props) {
  const { register } = useFormContext();
  return (
    <div className="space-x-4">
      {inputName.map((e) => (
        <input
          type="checkbox"
          className="h-6 w-6"
          {...register(`${user.id}-${e}`)}
        />
      ))}
    </div>
  );
}
