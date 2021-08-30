import React from "react";
import {
  VictoryScatter,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
  VictoryLegend,
} from "victory";
import { minBy, maxBy, split, map, join, uniqBy, filter } from "lodash";
import * as d3 from "d3";
import { useMemo, useCallback } from "react";

// https://formidable.com/open-source/victory/guides/themes

function multilineTooltop(str, lines) {
  const toMatrix = (arr, width) =>
    arr.reduce(
      (rows, key, index) =>
        (index % width === 0
          ? rows.push([key])
          : rows[rows.length - 1].push(key)) && rows,
      []
    );

  return map(toMatrix(split(str, " "), lines), (arr) => join(arr, " "));
}

const Point = ({ x, y, datum, events }) => {
  return <circle cx={x} cy={y} fill={datum.color} r="3" {...events}></circle>;
};

const Page = ({ shakespear }) => {
  const lines = useMemo(
    () => filter(shakespear, (entry) => entry.Player !== ""),
    [shakespear]
  );
  const players = useMemo(
    () =>
      map(
        uniqBy(lines, (d) => d.Player),
        (player) => ({ name: player.Player })
      ),
    [lines]
  );

  const colorScale = useCallback(
    () =>
      d3
        .scaleSequential()
        .domain([0, players.length])
        .interpolator(d3.interpolateRainbow),
    [players]
  );

  const data = useMemo(
    () =>
      lines.reduce((prev, curr) => {
        return [
          ...prev,
          {
            lineNumber: curr.Dataline,
            lineLength: curr.PlayerLine.length,
            color: colorScale()(
              players.findIndex((i) => i.name === curr.Player)
            ),
            ...curr,
          },
        ];
      }, []),
    [lines, colorScale, players]
  );

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domain={{
        x: [
          minBy(data, (d) => d.lineNumber).lineNumber,
          maxBy(data, (d) => d.lineNumber).lineNumber,
        ],
        y: [
          minBy(data, (d) => d.lineLength).lineLength,
          maxBy(data, (d) => d.lineLength).lineLength,
        ],
      }}
    >
      <VictoryLabel
        text="Line Number"
        angle={90}
        x={10}
        y={150}
        textAnchor="middle"
      />
      <VictoryLabel
        text="Line character length"
        x={225}
        y={340}
        textAnchor="middle"
      />
      <VictoryLegend
        title="Shakespear line reads"
        x={0}
        y={0}
        orientation="horizontal"
        gutter={10}
        colorScale={players.map((_, i) => colorScale()(i))}
        data={players}
        style={{ labels: { fontSize: 7 } }}
      />
      <VictoryScatter
        dataComponent={<Point />}
        data={data}
        x="lineNumber"
        y="lineLength"
        labels={({ datum }) => {
          // Formatting text in the tooltip if it's multiline is not easy.
          return multilineTooltop(
            `${datum.lineNumber}: ${datum.PlayerLine}`,
            6
          );
        }}
        labelComponent={
          <VictoryTooltip
            style={{ fill: "red", fontSize: 10, fontFamily: "monospace" }}
          />
        }
      />
    </VictoryChart>
  );
};
export default Page;
