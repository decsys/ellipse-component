import React from "react";
import IntervalAgreementApproach from "@decsys/iaa";
import { VictoryLabel, VictoryChart, VictoryAxis, VictoryLine } from "victory";

const Visualization = ({ params, values }) => {
  // add all our results to an iaa class
  const iaa = new IntervalAgreementApproach();
  for (const interval of values) iaa.addInterval(interval);

  // We don't sample discretely across the whole range;
  // rather we use each unique result point to plot our results
  const tiny = 1e-10;
  const reducer = (data, x, i, a) => {
    const lastY = iaa.membership(x - tiny) * 100;
    const y = iaa.membership(x) * 100;
    const nextY = iaa.membership(x + tiny) * 100;

    if (lastY < y) data.push({ x, y: lastY });
    data.push({ x, y });
    if (nextY < y) data.push({ x, y: nextY });

    return data;
  };
  const data = iaa.intervals.singletonKeys.reduce(reducer, [{ x: 0, y: 0 }]);

  const maxY = Math.max(...data.map(d => d.y));

  const centroidValue = iaa.centroid;
  const centroid = [{ x: centroidValue, y: 0 }, { x: centroidValue, y: maxY }];

  return (
    <VictoryChart
      minDomain={{ x: 0, y: 0 }}
      maxDomain={{
        x: params.barMaxValue + params.barMaxValue * 0.1,
        y: maxY + maxY * 0.1
      }}
    >
      <VictoryAxis
        label="% Participants"
        dependentAxis
        axisLabelComponent={<VictoryLabel x={20} />}
      />
      <VictoryAxis label="Scale Value" />
      <VictoryLine data={data} />
      <VictoryLine
        data={centroid}
        style={{
          data: { stroke: "red" },
          labels: { angle: -90, fill: "red", fontSize: 16 }
        }}
        labels={["Centroid"]}
        labelComponent={<VictoryLabel y={100} />}
      />
    </VictoryChart>
  );
};

export default Visualization;
