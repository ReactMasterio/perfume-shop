import React from "react";
import logo from "@/public/next.svg";
import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "./components/MobileMenu";
import LogInButton from "./components/LogInButton";
import DesktopNavigation from "./components/DesktopNavigation";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-5 py-3 shadow-md">
      <Link href="/">
        <Image src={logo} alt="logo" width={85} />
      </Link>

      <DesktopNavigation />

      <MobileMenu />
    </header>
  );
};

export default Header;
