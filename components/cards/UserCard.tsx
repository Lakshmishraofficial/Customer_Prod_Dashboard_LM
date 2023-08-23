"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { Button } from "../ui/button";
import { useTheme } from "../../app/themes/themeContext";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

function UserCard({ id, name, username, imgUrl, personType }: Props) {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const isCommunity = personType === "Community";

  return (
    <Suspense
    fallback={<h1 className="text-light-1 text-heading3-bold">Preparing Your Experience...</h1>}
  >
    <article className={isDarkMode
          ? 'user-carddark':'user-cardlight'}>
      <div className='user-card_avatar'>
        <div className='relative h-12 w-12'>
          <Image
            src={imgUrl}
            alt='user_logo'
            fill
            className='rounded-full object-cover'
          />
        </div>

        <div className='flex-1 text-ellipsis'>
          <h4 className={isDarkMode
          ?'text-base-semibold text-light-1':'text-base-semibold text-dark-1'}>{name}</h4>
          <p className='text-small-medium text-gray-1'>@{username}</p>
        </div>
      </div>

      <Button
        className='user-card_btn'
        onClick={() => {
          if (isCommunity) {
            router.push(`/communities/${id}`);
          } else {
            router.push(`/profile/${id}`);
          }
        }}
      >
        View
      </Button>
    </article>
    </Suspense>
  );
}

export default UserCard;
