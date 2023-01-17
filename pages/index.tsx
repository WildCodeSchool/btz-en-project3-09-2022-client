import Footer from "../src/components/Footer/footer";

export default function Home() {
  const { isLoading, isError, data, error } = useQuery(["categories"], () =>
    categoryFetcher.getAll()
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
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
      ;
      <Welcome />
      <div className="flex flex-col justify-end h-screen">
        <Footer />
      </div>
    </div>
  );
}
