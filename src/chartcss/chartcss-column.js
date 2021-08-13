import { scaleLinear } from "d3-scale";
import { countBy } from "lodash";

import "./chartcss.css";

export default function ChartCSS({ shakespear }) {
  const barScale = scaleLinear().domain([0, 175]).range([0, 1]);
  const lines = countBy(shakespear, (line) => line.Player);

  return (
    <div id="my-chart">
      <table
        id="example"
        className="charts-css column show-heading show-labels"
      >
        <caption> Act I Henery V</caption>
        <tbody>
          {Object.entries(lines).map(([player, lines]) => {
            return (
              <tr key={"column-" + player}>
                <th scope="row"> {player} </th>
                <td style={{ "--size": barScale(lines) }}> {lines} lines </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="primary-axis"> Player </div>
      <div className="data-axis"> Lines read </div>
    </div>
  );
}
