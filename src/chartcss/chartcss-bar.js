import { scaleLinear } from "d3-scale";
import { countBy } from "lodash";

import "./chartcss.css";

export default function ChartCSSLine({ shakespear }) {
  const barScale = scaleLinear().domain([0, 175]).range([0, 1]);
  const lines = countBy(shakespear, (line) => line.Player);

  return (
    <table
      id="example"
      className="charts-css bar show-heading show-labels hide-data"
    >
      <caption> Act I Henery V, Lines per character </caption>
      <tbody>
        {Object.entries(lines).map(([player, lines]) => {
          return (
            <tr key={"bar-" + player}>
              <th scope="row"> {player} </th>
              <td style={{ "--size": barScale(lines) }}>
                {" "}
                <span className="data">{lines} lines</span>{" "}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
