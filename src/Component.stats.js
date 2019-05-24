import React from "react";
import * as math from "mathjs";
import IntervalAgreementApproach from "@decsys/iaa";
import Visualization from "./components/Visualization";

// import { handleTypeErrors } from "./utils/errors";

const stats = (params, results) => {
  // break down the results in a bunch of different useful ways...
  const reducer = (data, { minRangeValue: min, maxRangeValue: max }, i, a) => {
    data.values.push([min, max]);
    data.minValues.push(min);
    data.maxValues.push(max);
    data.intervalWidths.push(max - min);
    return data;
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
        component: <Visualization params={params} iaa={iaa} />
      }
    ],
    stats: {
      ["Mean Lower Bound"]: math.mean(minValues),
      ["Mean Upper Bound"]: math.mean(maxValues),
      ["Mean Interval Width"]: math.mean(intervalWidths),
      ["Interval Width Standard Deviation"]: math.std(intervalWidths),
      ["Lowest response"]: Math.min(...minValues),
      ["Highest response"]: Math.max(...maxValues),
      ["Centroid"]: centroidValue
    }
  };
};

export default stats;
