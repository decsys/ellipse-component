import React from "react";
import * as math from "mathjs";
import IntervalAgreementApproach from "@decsys/iaa";
import Visualization from "./components/Visualization";

const stats = (params, results) => {
  // break down the results in a bunch of different useful ways...
  const reducer = (a, { minRangeValue: min, maxRangeValue: max }) => {
    a.values.push([min, max]);
    a.minValues.push(min);
    a.maxValues.push(max);
    a.intervalWidths.push(max - min);
    return a;
  };
  const { values, intervalWidths, minValues, maxValues } = results.reduce(
    reducer,
    {
      values: [],
      intervalWidths: [],
      minValues: [],
      maxValues: []
    }
  );

  const iaa = new IntervalAgreementApproach();
  for (const interval of values) iaa.addInterval(interval);
  const centroidValue = iaa.centroid;

  return {
    visualizations: [
      {
        name: "Ellipse Results",
        component: <Visualization {...params} iaa={iaa} />
      }
    ],
    stats: {
      ["Left Endpoint - Mean, STD"]: `${math.mean(minValues)}, ${math.mean(
        maxValues
      )}`,
      ["Right Endpoint - Mean, STD"]: `${math.mean(maxValues)}, ${math.mean(
        maxValues
      )}`,
      ["Size - Mean, STD"]: `${math.mean(intervalWidths)}, ${math.std(
        intervalWidths
      )}`,
      ["Response - Min, Max"]: `${Math.min(...minValues)}, ${Math.max(
        ...maxValues
      )}`,
      ["Centroid"]: centroidValue
    }
  };
};

export default stats;
