import React from "react";
import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
type Props = {};

async function page({}: Props) {
  return (
    <div className="p-4">
      <DashboardSkeleton />
    </div>
  );
}

export default page;

export const DashboardSkeleton = () => {
  return (
    <div className="p-4  w-full h-full ">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-400 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-400 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-400 rounded"></div>
            <div className="h-4 bg-gray-400 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
