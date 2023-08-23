"use client";
import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../app/themes/themeContext";

function Topbar() {
  const { isDarkMode } = useTheme();
  return (
    <nav className={isDarkMode ? "topbardark" : "topbarlight"}>
      <Link href="/" className="flex items-center gap-4">
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <p
          className={
            isDarkMode
              ? "text-heading3-bold text-light-1 "
              : "text-heading3-bold text-dark-1 "
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
                organizationSwitcherTrigger: "py-2 px-4",
              },
            }}
          />{" "}
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
