import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import * as d3 from "d3";
import { uniqBy, minBy, maxBy, filter } from "lodash";

import "./Graph.css";

const width = 700;
const height = 500;

export default function ReactComponent({ shakespear }) {
  const [data, setData] = useState([]);
  const [active, setActive] = useState({});
  const refElement = useRef(null);

  useEffect(() => {
    const lines = filter(shakespear, (entry) => entry.Player !== "");
    Promise.resolve().then(() => setData(lines));
  }, [shakespear]);

  const players = useMemo(() => uniqBy(data, (d) => d?.Player), [data]);
  const xDomain = useMemo(
    () => [
      minBy(data, (d) => d?.Dataline)?.Dataline,
      maxBy(data, (d) => d?.Dataline)?.Dataline,
    ],
    [data]
  );
  const yDomain = useMemo(
    () => [
      minBy(data, (d) => d?.PlayerLine.length)?.PlayerLine.length,
      maxBy(data, (d) => d?.PlayerLine.length)?.PlayerLine.length,
    ],
    [data]
  );
  const xScale = useCallback(
    () =>
      d3
        .scaleLinear()
        .domain(xDomain)
        .range([0, width - 40])
        .clamp(true),
    [xDomain]
  );
  const yScale = useCallback(
    () =>
      d3
        .scaleLinear()
        .domain(yDomain)
        .range([height - 40, 0])
        .clamp(true),
    [yDomain]
  );
  const sequentialScale = useCallback(
    () =>
      d3
        .scaleSequential()
        .domain([0, Object.keys(players).length])
        .interpolator(d3.interpolateRainbow),
    [players]
  );

  useLayoutEffect(renderD3, [data, players, sequentialScale, xScale, yScale]);

  function renderD3() {
    const { current } = refElement;

    if (data?.length) {
      const xAxis = (g) =>
        g.call(
          d3
            .axisBottom(xScale())
            .tickValues(
              d3.ticks(...d3.extent(data, (d) => d?.Dataline), width / 120)
            )
        );
      const yAxis = (g) =>
        g.call(
          d3
            .axisLeft(yScale())
            .tickValues(
              d3.ticks(
                ...d3.extent(data, (d) => d?.PlayerLine.length),
                height / 100
              )
            )
        );

      const margin = 40;
      const svg = d3.select(refElement.current);

      svg.append("g").attr("transform", `translate(${margin}, 9)`).call(yAxis);
      svg
        .append("g")
        .attr("transform", `translate(${margin}, ${height - 40})`)
        .call(xAxis);
      svg.append("g").attr("transform", `translate(${margin}, -${margin})`);

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

      svg
        .append("g")
        .attr("transform", `translate(${margin}, 0)`)
        .selectAll("path")
        .data(data)
        .enter()
        .append("circle")
        .style("fill", (d) =>
          sequentialScale()(players.findIndex((i) => i?.Player === d?.Player))
        )
        .attr("cx", (d) => xScale()(d?.Dataline))
        .attr("cy", (d) => yScale()(d?.PlayerLine.length))
        .attr("r", 5)
        .on("click", (node, value) => {
          d3.select(node.target).style("fill", "yellow");
          setActive(value);
        });
    }

    return () => d3.select(current).selectAll("*").remove();
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
