"use client";
import Link from "next/link";

import { AiOutlineClose } from "react-icons/ai";

//Shadcn ui
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

//local import
import { menuItems } from "@/app/utils/data";

type NavbarProps = {
  isVisible: boolean;
  handleMobileNav?: () => void;
};

const Navbar = ({ isVisible, handleMobileNav }: NavbarProps) => {
  const menuItem = menuItems;
  return (
    <div>
      {/* Mobile Menu  Overlay*/}
      {isVisible ? (
        <div
          onClick={handleMobileNav}
          className="bg-black/80 fixed w-full h-screen z-20 top-0 left-0"
        ></div>
      ) : (
        ""
      )}
      <div
        className={
          isVisible
            ? "bg-white fixed top-0 -left-1 h-screen w-full max-w-80 p-5 shadow-lg overflow-y-scroll overscroll-contain block transition duration-500 ease-in  z-20 has-scrollbar"
            : "bg-white fixed top-0 -left-full h-screen w-full max-w-80  p-5 shadow-lg overflow-y-scroll overscroll-contain hidden transition duration-500 ease-in  z-20 has-scrollbar"
        }
      >
        <div className="">
          <div className="flex  items-center justify-between">
            <h2 className="text-xl font-semibold text-primary">Menu</h2>
            <button className="hover:text-primary hover:transition hover:duration-500 hover:ease-in">
              <AiOutlineClose
                onClick={handleMobileNav}
                size={25}
                className="cursor-pointer"
              />
            </button>
          </div>
          <hr className="h-[0.6px] my-5 border-t-0 bg-gray-300" />

          <div className="">
            <div className="flex flex-col space-y-4 mt-5 mb-6 ">
              <Link
                className="hover:text-primary hover:transition hover:duration-500 hover:ease-in"
                href={"/login"}
                onClick={handleMobileNav}
              >
                Log in
              </Link>

              <Link
                className="hover:text-primary hover:transition hover:duration-500 hover:ease-in"
                href={"/register"}
                onClick={handleMobileNav}
              >
                Sign up
              </Link>

              <Link
                className="hover:text-primary hover:transition hover:duration-500 hover:ease-in"
                href={"/became-seller"}
                onClick={handleMobileNav}
              >
                Become Seller
              </Link>
            </div>
            <hr className="h-[0.6px] my-5 border-t-0 bg-gray-300" />
            <div className="mb-8">
              {menuItem &&
                menuItem.map((i) => (
                  <Link
                    className="flex"
                    key={i.id}
                    href={i.url}
                    passHref
                    onClick={handleMobileNav}
                  >
                    <span className="py-2 hover:text-primary hover:transition hover:duration-500 hover:ease-in">
                      {i.name}
                    </span>
                  </Link>
                ))}
            </div>
            <hr className="h-[0.6px] my-5 border-t-0 bg-gray-300" />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="hover:no-underline">
                  Language
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="rounded-xl border">
                    <li className="p-3 hover:text-primary hover:transition hover:duration-500 hover:ease-in">
                      <Link href="#">English</Link>
                    </li>
                    <hr className="h-[0.6px] mx-2 border-t-0 bg-gray-300" />

                    <li className="p-3 hover:text-primary hover:transition hover:duration-500 hover:ease-in">
                      <Link href="#">Espa&ntilde;ol</Link>
                    </li>
                    <hr className="h-[0.6px] mx-2 border-t-0 bg-gray-300" />

                    <li className="p-3 hover:text-primary hover:transition hover:duration-500 hover:ease-in">
                      <Link href="#">Fren&ccedil;h</Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger className="hover:no-underline">
                  Currency
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="rounded-xl border">
                    <li className="p-3 hover:text-primary hover:transition hover:duration-500 hover:ease-in">
                      <a href="#">USD $</a>
                    </li>
                    <hr className="h-[0.6px] mx-2 border-t-0 bg-gray-300" />
                    <li className="p-3 hover:text-primary hover:transition hover:duration-500 hover:ease-in">
                      <a href="#">EUR &euro;</a>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
