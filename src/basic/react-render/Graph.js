import React, { useState, useEffect } from "react";
import { scaleLinear, scaleSequential } from "d3-scale";
import * as d3 from "d3";
import { filter, uniqBy } from "lodash";

import "./Graph.css";

const width = 600;
const height = 850;

const xScale = scaleLinear().domain([0, 350]).range([0, width]);
const yScale = scaleLinear().domain([0, 70]).range([height, 0]);

export default function ReactComponent({ shakespear }) {
  const [data, setData] = useState([]);
  const [players, setPlayers] = useState([]);
  const [guiData, setGUIData] = useState([]);
  const [active, setActive] = useState("");

  const lines = filter(shakespear, (entry) => entry.Player !== "");
  const sequentialScale = scaleSequential()
    .domain([0, Object.keys(players).length])
    .interpolator(d3.interpolateRainbow);

  function activate(data, i) {
    const newArr = guiData.map((_, ii) => (ii === i ? true : false));
    setActive(data);
    setGUIData(newArr);
  }

  useEffect(() => {
    Promise.resolve().then(() => {
      setData(lines);
      setPlayers(uniqBy(lines, (d) => d.Player));
      setGUIData(Array(lines.length).fill(false));
    });
  }, []);

  return (
    <div className="graph">
      <div className="gui">
        <p>Render in React</p>
        <p>Name: {active.Player}</p>
        Line: {active.PlayerLine}
      </div>
      <svg viewBox={[0, 0, width, height]}>
          <text transform={`translate(${width / 2}, ${height})`}>
            line number
          </text>
        <g className="xaxis">
          {xScale.ticks().map((tick) => (
            <g
              key={`x-${tick}`}
              className="tick"
              transform={`translate(${xScale(tick)}, 0)`}
            >
              <line y1="-15" y2="-20"></line>
              <text x="-10" y="0">
                {tick > 0 && tick}
              </text>
            </g>
          ))}
        </g>
        <g className="yaxis">
          <text transform={`translate(-40, ${height / 2}), rotate(90)`}>
            line length
          </text>
          {yScale.ticks().map((tick) => (
            <g
              key={`y-${tick}`}
              className="tick"
              transform={`translate(-20, ${yScale(tick)})`}
            >
              <line x1="15" x2="20"></line>
              <text x="-9" y="0.32em">
                {tick > 0 && tick}
              </text>
            </g>
          ))}
        </g>
        <g className="scatter">
          {data.map((d, i) => (
            <circle
              key={d.Dataline}
              style={{ cursor: "pointer" }}
              cx={xScale(d.Dataline)}
              cy={yScale(d.PlayerLine.length)}
              r="5"
              fill={
                !!guiData[i]
                  ? "yellow"
                  : sequentialScale(
                      players.findIndex((i) => i.Player === d.Player)
                    )
              }
              onClick={() => activate(d, i)}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
