import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  return redirect("/client-admin/home");
};

export default page;
