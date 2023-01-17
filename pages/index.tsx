/* eslint-disable no-console */
import { useQuery } from "@tanstack/react-query";
import Footer from "../src/components/Footer/footer";
import Welcome from "../src/components/Welcome";
import { categoryFetcher } from "../src/utils/fetcher";

export default function Home() {
  const { isLoading, isError, data, error } = useQuery(["categories"], () =>
    categoryFetcher.getAll()
  );

  if (isLoading) {
    setTimeout(() => {
      console.log("Delayed for 1 second.");
    }, 100000);
    return <Welcome />;
  }

  if (isError) {
    console.error(error);
    return <h1>An error has occured, please try again later</h1>;
  }

  return (
    <div>
      <div>
        {data?.map((c) => (
          <div>{c.name}</div>
        ))}
      </div>
      <div className="flex flex-col justify-end h-screen">
        <Footer />
      </div>
    </div>
  );
}
