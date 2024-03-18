"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

//react icons
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";

//shadcn ui components
import { Input } from "@/components/ui/input";
import { Menubar } from "@/components/ui/menubar";
import { Badge } from "@/components/ui/badge";

//local components
import MobileNav from "@/components/Navbar/MobileNav";
import UserDropdownMenu from "../UserMenu/UserDropdownMenu";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  const handleMobileNav = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Menubar
        className="flex justify-center xs:justify-between items-center h-16 xs:h-[42px] pl-4 pr-8  border-l-0 
        border-none  rounded-none xs:bg-[#232F3E] text-white"
      >
        <div className="xs:mt-0 pl-4 mt-2">
          <div className="hidden xs:block text-sm space-x-1">
            <select className="bg-[#232F3E] cursor-pointer " name="currency">
              <option value="usd">USD $</option>
              <option value="eur">EUR &euro;</option>
            </select>

            <select className="bg-[#232F3E] cursor-pointer" name="language">
              <option value="en-US">English</option>
              <option value="es-ES">Espa&ntilde;ol</option>
              <option value="fr">Fran&ccedil;ais</option>
            </select>
          </div>
          <Link className="xs:hidden " href="/">
            <Image
              src="/images/Logo.svg"
              width={150}
              height={220}
              alt="Picture of the author"
            />
          </Link>
        </div>

        <div className="hidden l:block text-sm">
          <p>
            <b className="mr-2">Free Shipping</b>
            This Week Order Over - $55
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button
            className="hidden xs:flex gap-1 items-center text-sm p-2 hover:text-primary hover:opacity-85 
            hover:transition "
          >
            Became Seller <MdKeyboardArrowRight />
          </button>{" "}
        </div>
      </Menubar>
      <Menubar className="flex justify-between items-center h-16 p-8 border-l-0 border-r-0">
        <div className="l:hidden">
          <button onClick={handleMobileNav}>
            <AiOutlineMenu size={30} />
          </button>
          <MobileNav isVisible={isVisible} handleMobileNav={handleMobileNav} />
        </div>

        {/* <MobileNav /> */}
        <Link className=" hidden xs:block" href="/">
          <Image
            src="/images/Logo.svg"
            width={160}
            height={220}
            alt="Picture of the author"
          />
        </Link>
        <div className="hidden l:block">
          <form className="flex items-center relative">
            <Input
              className=" rounded-[50px] w-[350px] pl-6"
              type="search"
              name="search"
              placeholder="Enter your product name..."
            />
            <button className="absolute top-2.5 right-4 text-gray-400 rounded-none bg-none ">
              <IoSearchOutline />
            </button>
          </form>
        </div>

        <div className="flex gap-10 items-center text-xl s:text-2xl">
          <button className="l:hidden">
            <IoSearchOutline />
          </button>

          <button className="hidden l:block">
            {/* <FaRegUser /> */}
            <UserDropdownMenu />
          </button>
          <button className="relative ">
            <Badge className="absolute -top-3 -right-2 py-0 px-1 rounded-[50px]">
              0
            </Badge>
            <MdOutlineFavoriteBorder />
          </button>
          <button className="relative">
            <Badge className="absolute -top-3 -right-2 py-0 px-1 rounded-[50px]">
              0
            </Badge>
            <BsCart3 />
          </button>
        </div>
      </Menubar>
      <Menubar className="hidden l:flex justify-center items-center rounded-none border-t-0 gap-12 h-14 ">
        <Link
          className={`link ${pathname === "/" ? "text-primary" : ""}`}
          href={"/"}
        >
          Home
        </Link>
        <Link
          className={`link ${pathname === "/category" ? "text-primary" : ""}`}
          href={"/category"}
        >
          Category
        </Link>
        <Link
          className={`link ${
            pathname === "/bestSelling" ? "text-primary" : ""
          }`}
          href={"/bestSelling"}
        >
          Best Selling
        </Link>
        <Link
          className={`link ${pathname === "/products" ? "text-primary" : ""}`}
          href={"/products"}
        >
          Products
        </Link>
        <Link
          className={`link ${pathname === "/events" ? "text-primary" : ""}`}
          href={"/events"}
        >
          Events
        </Link>
        <Link
          className={`link ${pathname === "/faq" ? "text-primary" : ""}`}
          href={"/faq"}
        >
          FAQ
        </Link>
      </Menubar>
    </>
  );
};

export default Header;

// #09334E
// #07273B
// #DF7089 #DF769B
// #2DE9A6 #49ACE9
// bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300
