import React, { useState } from "react";
import { useAuth } from "../../context/UserContext";

export default function CreateSpace() {
  const { user } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  if (!user) {
    return <div>Please connect first</div>;
  }

  return <div>CreateSpace</div>;
}
