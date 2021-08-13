import React, { useState, useEffect } from "react";
import { scaleLinear, scaleSequential } from "d3-scale";
import * as d3 from "d3";
import { filter, uniqBy } from "lodash";

import "./Graph.css";

const xScale = scaleLinear().domain([0, 300]).range([10, 1000]);
const yScale = scaleLinear().domain([0, 300]).range([420, 800]);

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
      <svg>
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
      </svg>
    </div>
  );
}
