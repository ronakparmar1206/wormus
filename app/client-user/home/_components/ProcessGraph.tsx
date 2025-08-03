import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const mockData = [
  {
    process: "Navigation",
    steps: 2,
  },
  {
    process: "Engine Log",
    steps: 2,
  },
  {
    process: "Tank Log",
    steps: 2,
  },
  {
    process: "Noon Report",
    steps: 2,
  },
  {
    process: "Master Sign-off",
    steps: 2,
  },
  {
    process: "VDR Sync",
    steps: 2,
  },
];
const ProcessGraph = () => {
  return (
    <Card className="bg-[#F9F9FA] shadow-none">
      <CardHeader>
        <CardTitle>Process Graph</CardTitle>
      </CardHeader>
      <CardContent className="h-full grid">
        {mockData.map((e) => (
          <div className="grid grid-cols-2" key={e.process}>
            <p className="text-sm">{e.process}</p>
            <div className="flex items-center gap-0.5">
              <span className="inline-block w-4 h-1 rounded-full bg-primary" />
              <span className="inline-block w-4 h-1 rounded-full bg-primary/60" />
              <span className="inline-block w-4 h-1 rounded-full bg-primary/20" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProcessGraph;
