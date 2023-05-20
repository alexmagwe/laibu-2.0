import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

// Profile Dropdown
export function ProfileDropDown() {
  const user = useSession().data?.user;

  const navigation = [{ title: "Settings", path: "/settings" }];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none focus:outline-cyan-200 p-1 rounded-full">
        {user && user.image && (
          <Avatar className="my-2">
            <AvatarImage src={user.image} />
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-slate-100 p-3 rounded-md">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {navigation.map((item, idx) => (
          <DropdownMenuItem
            className="my-2 outline-none focus:outline-cyan-200 hover:text-slate-200 hover:bg-cyan-600 rounded-md p-1 duration-200"
            key={idx}
          >
            <Link href={item.path}>{item.title}</Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem className="my-2 focus:outline-cyan-200 hover:text-slate-200 hover:bg-cyan-600 rounded-md p-1 duration-200">
          <button onClick={() => signOut()}>Logout</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
