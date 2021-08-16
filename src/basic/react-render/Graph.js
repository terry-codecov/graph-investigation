import React, { useState, useEffect, useCallback } from "react";
import { scaleLinear, scaleSequential } from "d3-scale";
import * as d3 from "d3";
import { filter, uniqBy, minBy, maxBy } from "lodash";

import "./Graph.css";

import XAxis from "./xaxis";
import YAxis from "./yaxis";

const width = 700;
const height = 800;


export default function ReactComponent({ shakespear }) {
  const [data, setData] = useState([]);
  const [players, setPlayers] = useState([]);
  const [guiState, setGuiState] = useState([]);
  const [active, setActive] = useState(null);
  const [xDomain, setXDomain] = useState([0,1])
  const [yDomain, setYDomain] = useState([0,1])
  const xScale = useCallback(() => scaleLinear().domain(xDomain).range([0, width]).clamp(true), [xDomain])
  const yScale = useCallback(() => scaleLinear().domain(yDomain).range([height, 0]).clamp(true), [yDomain])

  console.log(data)
  const sequentialScale = scaleSequential()
    .domain([0, Object.keys(players).length])
    .interpolator(d3.interpolateRainbow);

  function activate(i) {
    const newArr = guiState.map((_, ii) => (ii === i ? true : false));
    setActive(i);
    setGuiState(newArr);
  }

  // Mount
  useEffect(() => {
    Promise.resolve().then(() => {
      const lines = filter(shakespear, (entry) => entry.Player !== "");
      setXDomain([minBy(lines, d => d.Dataline).Dataline, maxBy(lines, d => d.Dataline).Dataline])
      setYDomain([minBy(lines, d => d.PlayerLine.length).PlayerLine.length, maxBy(lines, d => d.PlayerLine.length).PlayerLine.length])
      setData(lines);
      setPlayers(uniqBy(lines, (d) => d.Player));
    });
  }, [shakespear]);

  // UI state
  useEffect(() => {
    const newArr = Array(data.length).fill(false);
    setGuiState(newArr.map((_, ii) => (ii === active ? true : false)));
  }, [active, data]);

  return (
    <div className="graph">
      <div className="gui">
        <p>Name: {data[active]?.Player}</p>
        Line: {data[active]?.PlayerLine}
      </div>
      <svg viewBox={[0, 0, width, height]} preserveAspectRatio="xMidYMid meet">
        <XAxis scale={xScale()} label="line number" />
        <YAxis scale={yScale()} label="line length" />
        <g className="scatter">
          {data.map((d, i) => (
            <circle
              key={d.Dataline}
              cx={xScale()(d.Dataline)}
              cy={yScale()(d.PlayerLine.length)}
              r="5"
              fill={
                !!guiState[i]
                  ? "yellow"
                  : sequentialScale(
                      players.findIndex((i) => i.Player === d.Player)
                    )
              }
              onClick={() => activate(i)}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
