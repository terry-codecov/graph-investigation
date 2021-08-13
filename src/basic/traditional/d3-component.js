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
      .attr("height", height);
    this.updateDatapoints();
  }

  updateDatapoints = () => {
    const {
      svg,
      props: { data, width, height },
    } = this;
    const players = uniqBy(data, (d) => d.Player);
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .style("fill", (d) => {
        const sequentialScale = d3
          .scaleSequential()
          .domain([0, Object.keys(players).length])
          .interpolator(d3.interpolateRainbow);
        return sequentialScale(players.findIndex((i) => i.Player === d.Player));
      })
      .attr("cx", (d) => {
        const xScale = d3.scaleLinear().domain([0, 300]).range([10, width]);
        xScale.clamp(true);
        return xScale(d.Dataline);
      })
      .attr("cy", (d) => {
        const yScale = d3
          .scaleLinear()
          .domain([0, 300])
          .range([height / 2, height]);
        yScale.clamp(true);
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
