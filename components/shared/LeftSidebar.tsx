"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import { useTheme } from "../../app/themes/themeContext";
import { sidebarLinks } from "@/constants";

const LeftSidebar = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const { userId } = useAuth();

  return (
    <section
      className={
        isDarkMode
          ? "custom-scrollbar leftsidebardark"
          : "custom-scrollbar leftsidebarlight"
      }
    >
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && "bg-primary-500 "}`}
            >
              <Image
                style={isDarkMode ? {} : { filter: "invert(1)" }}
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p
                className={
                  isDarkMode
                    ? "text-light-1 max-lg:hidden"
                    : "text-dark-1 max-lg:hidden"
                }
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
               style={isDarkMode ? {} : { filter: "invert(1)" }}
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />

              <p  className={
                  isDarkMode
                    ? "text-light-2 max-lg:hidden"
                    : "text-dark-2 max-lg:hidden"
                }>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
