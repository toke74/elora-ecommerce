"use client";
import Link from "next/link";
import { useState } from "react";

import {
  LuCreditCard,
  LuUser,
  LuLogOut,
  LuSettings,
  LuLifeBuoy,
  LuUserPlus,
  LuLogIn,
} from "react-icons/lu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserDropdownMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <LuUser />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-44 pb-5 absolute top-2 -right-7">
        {isLoggedIn ? (
          <div>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LuUser className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LuCreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LuSettings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LuLifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LuLogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </div>
        ) : (
          <div>
            <DropdownMenuLabel>Hello, Sign in</DropdownMenuLabel>
            <DropdownMenuGroup>
              <Link href={"/login"} passHref>
                <DropdownMenuItem className="cursor-pointer">
                  <LuLogIn className="mr-2 h-4 w-4" />
                  <span>Log in</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuGroup>
              <DropdownMenuLabel>New customer?</DropdownMenuLabel>
              <Link href={"/register"} passHref>
                <DropdownMenuItem className="cursor-pointer">
                  <LuUserPlus className="mr-2 h-4 w-4" />
                  <span>Sign up</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

//New customer? Start here.
export default UserDropdownMenu;
