import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  return redirect("/client-user/home");
};

export default page;
