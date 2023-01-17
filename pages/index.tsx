/* eslint-disable no-console */
import { useQuery } from "@tanstack/react-query";
import Loader from "../src/components/Loader";
import { categoryFetcher } from "../src/utils/fetcher";

export default function Home() {
  const { isLoading, isError, data, error } = useQuery(["categories"], () =>
    categoryFetcher.getAll()
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.error(error);
    return <h1>An error has occured, please try again later</h1>;
  }

  return (
    <div>
      {data?.map((c) => (
        <div>{c.name}</div>
      ))}
    </div>
  );
}
