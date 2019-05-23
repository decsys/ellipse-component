import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Component from "./Component";

const dummyEllipseResults = [
  {
    minRangeValue: 10,
    maxRangeValue: 32.337,
    completed: true
  },
  {
    minRangeValue: 20,
    maxRangeValue: 63,
    completed: true
  },
  {
    minRangeValue: 35,
    maxRangeValue: 100,
    completed: true
  },
  {
    minRangeValue: 40,
    maxRangeValue: 95,
    completed: true
  }
];

const visualization = stats => () => (
  <div style={{ marginLeft: "3em", width: "40%" }}>
    {stats.visualizations[0].component}
  </div>
);

const stats = stats => () => (
  <div>
    {Object.keys(stats.stats).map(x => (
      <div key={x}>
        <h4>{x}</h4>
        <p>{stats.stats[x]}</p>
      </div>
    ))}
  </div>
);

const actions = {
  setNextEnabled: action("Next button toggled"),
  logResults: action("Results logged")
};

storiesOf("Component", module)
  .add("Default", () => (
    <Component
      barLeftMargin={10}
      barTopMargin={50}
      barRightMargin={10}
      barThickness={8}
      barMaxValue={100}
      barMinValue={0}
      {...actions}
    />
  ))
  .add(
    "Numeric Visualisation",
    visualization(Component.stats(Component.defaultProps, dummyEllipseResults))
  )
  .add(
    "Numeric stats",
    stats(Component.stats(Component.defaultProps, dummyEllipseResults))
  );
