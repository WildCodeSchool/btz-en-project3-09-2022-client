import Footer from "../src/components/Footer/footer";

import MyAccountMobile from "../src/components/MyAccountMobile";

export default function Home() {
  return (
    <div>
      <MyAccountMobile />

      <div className="flex flex-col justify-end h-screen">
        <Footer />
      </div>
    </div>
  );
}
