import { ReactNode } from "react";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar";

interface IProps {
  children: ReactNode;
  sideBar?: ReactNode;
}

export default function Layout({ children, sideBar }: IProps) {
  return (
    <div className="h-screen w-screen flex justify-start items-center align-middle flex-col">
      <Navbar />
      <div className="h-full flex justify-between w-full">
        {sideBar && sideBar}
        {children}
      </div>

      <Footer />
    </div>
  );
}
