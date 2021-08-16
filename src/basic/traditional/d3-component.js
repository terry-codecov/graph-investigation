import * as d3 from "d3";
import { uniqBy } from "lodash";

class D3Component {
  containerEl;
  props;
  svg;

  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height } = props;
    this.svg = d3
      .select(containerEl)
      .append("svg")
      .style("background-color", "white")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);
    this.updateDatapoints();
  }

  updateDatapoints = () => {
    const {
      svg,
      props: { data, width, height },
    } = this;
    const players = uniqBy(data, (d) => d.Player);
    const margin = 40;

    const xScale = d3.scaleLinear().domain([0, 350]).range([0, width]);
    const xAxis = (g) => {
      return g.call(
        d3
          .axisBottom(xScale)
          .tickValues(
            d3.ticks(...d3.extent(data, (d) => d.Dataline), width / 120)
          )
      );
    };

    const yScale = d3.scaleLinear().domain([0, 70]).range([height, 0]);
    const yAxis = (g) => {
      return g.call(
        d3
          .axisLeft(yScale)
          .tickValues(
            d3.ticks(
              ...d3.extent(data, (d) => d.PlayerLine.length),
              height / 100
            )
          )
      );
    };

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
      .append("circle")
      .call(yAxis)
      .style("fill", (d) => {
        const sequentialScale = d3
          .scaleSequential()
          .domain([0, Object.keys(players).length])
          .interpolator(d3.interpolateRainbow);
        return sequentialScale(players.findIndex((i) => i.Player === d.Player));
      })
      .attr("cx", (d) => {
        return xScale(d.Dataline);
      })
      .attr("cy", (d) => {
        return yScale(d.PlayerLine.length);
      })
      .attr("r", 5)
      .on("click", (node, value) => {
        d3.select(node.target).style("fill", "yellow");
        this.setActiveDatapoint(value);
      });
  };

  setActiveDatapoint = (data) => {
    this.props.onDatapointClick(data);
  };

  resize = (width, height) => {
    const { svg } = this;
    svg.attr("width", width).attr("height", height);
  };
}

export default D3Component;
