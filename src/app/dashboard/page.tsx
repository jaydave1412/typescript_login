import { getServerSession } from "next-auth";
import React, { useEffect } from "react";

export default async function Dashboard() {
  const session = await getServerSession();
  console.log(session?.user.name);
  return <div>Hello {session?.user.name}</div>;
}
