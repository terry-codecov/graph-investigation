import { useEffect, useRef } from "react";
import { scaleLinear } from "d3-scale";

import "charts.css";

function Line({ start, size }) {
  const ref = useRef();
  useEffect(() => {
    const lineScale = scaleLinear().domain([0, 100]).range([0, 1]);
    ref.current.style.setProperty("--start", lineScale(start));
    ref.current.style.setProperty("--size", lineScale(size));
  }, [start, size]);
  return (
    <td ref={ref}>
      <span className="data"> {size} </span>
      <span className="tooltip"> I'm a tooltip </span>
    </td>
  );
}

export default function ChartCSS() {
  const line = [
    [50, 20],
    [20, 33],
    [33, 50],
    [50, 40],
  ];
  const line2 = [
    [0, 60],
    [60, 40],
    [40, 90],
    [90, 65],
  ];
  const line3 = [
    [30, 50],
    [50, 35],
    [35, 44],
    [44, 10],
  ];

  return (
    <div className="item">
      <ul className="charts-css legend legend-square">
        <li>Data 1</li>
        <li>Data 2</li>
        <li>Data 3</li>
      </ul>
      <table id="example" className="charts-css area multiple hide-data">
        <caption> Fake line data </caption>
        <tbody>
          {line.map(([start, end], i) => {
            const [start2, end2] = line2[i];
            const [start3, end3] = line3[i];

            return (
              <tr key={"area-" + i}>
                <Line start={start} size={end} />
                <Line start={start2} size={end2} />
                <Line start={start3} size={end3} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
