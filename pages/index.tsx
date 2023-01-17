import Footer from "../src/components/footer";

import MyAccountMobile from "../src/components/MyAccountMobile";

import Navbar from "../src/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-end h-screen">
        <Footer />
      </div>
    </div>
  );
}
