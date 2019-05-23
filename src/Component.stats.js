import React from "react";
import Visualization from "./components/Visualization";
// import { mean, sd } from "./utils/stats";
// import { handleTypeErrors } from "./utils/errors";

const stats = (params, results) => {
  return {
    visualizations: [
      {
        name: "Ellipse Results",
        component: (
          <Visualization
            params={params}
            values={results.map(r => [r.minRangeValue, r.maxRangeValue])}
          />
        )
      }
    ],
    stats: {
      // well... mean only really works for numeric values
      // and is also a "false" value for a likert scale providing a rank
      // so we'll do the best we can
      // ["Values Mean"]: handleTypeErrors(mean)(results.map(r => r.value)),
      // ["Values Standard Deviation"]: handleTypeErrors(sd)(
      //   results.map(r => r.value)
      // ),
      // ["Selected Index Mean"]: mean(results.map(r => r.index)),
      // ["Selected Index Standard Deviation"]: sd(results.map(r => r.index))
    }
  };
};

export default stats;
