import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { uniqBy, minBy, maxBy, filter } from "lodash";

import "./Graph.css";

const width = 700;
const height = 500;

export default function ReactComponent({ shakespear }) {
  const [data, setData] = useState([]);
  // const [width, setWidth] = useState(window.innerWidth / 2);
  // const [height, setHeight] = useState(window.innerHeight);
  const [active, setActive] = useState({});
  const refElement = useRef(null);

  useEffect(fetchData, [shakespear]);
  // useEffect(handleResizeEvent, []);
  useEffect(renderD3, [data]);

  function fetchData() {
    const lines = filter(shakespear, (entry) => entry.Player !== "");
    Promise.resolve().then(() => setData(lines));
  }

  // function handleResizeEvent() {
  //   let resizeTimer;
  //   const handleResize = () => {
  //     clearTimeout(resizeTimer);
  //     resizeTimer = setTimeout(function () {
  //       setWidth(window.innerWidth / 2);
  //       setHeight(window.innerHeight);
  //     }, 300);
  //   };
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }

  function renderD3() {
    if (data.length > 0) {
      const xDomain = [
        minBy(data, (d) => d?.Dataline)?.Dataline,
        maxBy(data, (d) => d?.Dataline)?.Dataline,
      ];
      const yDomain = [
        minBy(data, (d) => d?.PlayerLine.length)?.PlayerLine.length,
        maxBy(data, (d) => d?.PlayerLine.length)?.PlayerLine.length,
      ];
      const xScale = d3
        .scaleLinear()
        .domain(xDomain)
        .range([0, width])
        .clamp(true);
      const yScale = d3
        .scaleLinear()
        .domain(yDomain)
        .range([height, 0])
        .clamp(true);

      const players = uniqBy(data, (d) => d?.Player);
      const margin = 40;

      const xAxis = (g) => {
        return g.call(
          d3
            .axisBottom(xScale)
            .tickValues(
              d3.ticks(...d3.extent(data, (d) => d?.Dataline), width / 120)
            )
        );
      };
      const yAxis = (g) => {
        return g.call(
          d3
            .axisLeft(yScale)
            .tickValues(
              d3.ticks(
                ...d3.extent(data, (d) => d?.PlayerLine.length),
                height / 100
              )
            )
        );
      };

      const svg = d3.select(refElement.current);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin}, -${margin})`);
      const gx = svg
        .append("g")
        .attr("transform", `translate(${margin}, ${height - 40})`);
      const gy = svg
        .append("g")
        .attr("transform", `translate(${margin}, -${margin})`);

      // y
      svg
        .append("text")
        .attr("transform", `translate(0, ${height / 2}), rotate(90)`)
        .text("line length");
      // x
      svg
        .append("text")
        .attr("transform", `translate(${width / 2}, ${height - 10})`)
        .text("line number");

      gx.selectAll("g").data(data).enter().append("g").call(xAxis);
      gy.selectAll("g").data(data).enter().append("g").call(yAxis);

      g.selectAll("path")
        .data(data)
        .enter()
        .append("g")
        .call(xAxis)
        .call(yAxis)
        .append("circle")
        .style("cursor", "pointer")
        .style("fill", (d) => {
          const sequentialScale = d3
            .scaleSequential()
            .domain([0, Object.keys(players).length])
            .interpolator(d3.interpolateRainbow);
          return sequentialScale(
            players.findIndex((i) => i?.Player === d?.Player)
          );
        })
        .attr("cx", (d) => {
          return xScale(d?.Dataline);
        })
        .attr("cy", (d) => {
          return yScale(d?.PlayerLine.length);
        })
        .attr("r", 5)
        .on("click", (node, value) => {
          d3.select(node.target).style("fill", "yellow");
          setActive(value);
        });
    }
  }

  return (
    <div className="graph">
      <div className="gui">
        <p>Name: {active?.Player}</p>
        Line: {active?.PlayerLine}
      </div>
      <svg
        ref={refElement}
        viewBox={[0, 0, width, height]}
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="100%"
      />
    </div>
  );
}
