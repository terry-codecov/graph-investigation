import React from "react";
import { Scatter } from "@ant-design/charts";

const Page = ({ shakespear }) => {
  // Docs hard because they're chinese. Moving on
  const data = shakespear.reduce((prev, curr) => {
    return [...prev, { x: curr.Dataline, y: curr.PlayerLine.length, ...curr }];
  }, []);

  const config = {
    data,
    width: 500,
    height: 400,
    autoFit: true,
    xField: "Dataline",
    yField: "y",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  return <Scatter {...config} />;
};
export default Page;
