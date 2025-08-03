import React from "react";
import OnBoardPage from "./OnBoard";

const page = async ({ params, searchParams }: any) => {
  
  const { vessel } = await searchParams;
  console.log("vessel", vessel);
  return (
    <div>
      <OnBoardPage vessel={vessel} />
    </div>
  );
};

export default page;
