"use client";
import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../app/themes/themeContext";

function Topbar() {
  const { isDarkMode } = useTheme();
  return (
    <nav className={isDarkMode ? "topbardark transition duration-400 ease-in" : "topbarlight transition duration-400 ease-in"}>
      <Link href="/" className="flex items-center gap-4">
        <Image src="/mainLogo.svg" alt="logo" width={40} height={40} />
        <p
          className={
            isDarkMode
              ? "text-heading3-bold text-light-1 transition duration-400 ease-in"
              : "text-heading3-bold text-dark-1 transition duration-400 ease-in"
          }
        >
          Prime-HR
        </p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  style={isDarkMode ? {} : { filter: "invert(1)" }}
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <div className="sm:mr-5  sm:bg-dark-4 sm:rounded-md">
          {" "}
          <OrganizationSwitcher
            appearance={{
              baseTheme: dark,
              elements: {
                organizationSwitcherTrigger: "py-2 px-4 ml-2 sm:ml-0",
              },
            }}
          />{" "}
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
