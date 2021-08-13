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
  return <td ref={ref}></td>;
}

export default function ChartCSS() {
  const line = [
    [50, 20],
    [20, 33],
    [33, 50],
    [50, 40],
    [40, 55],
    [55, 70],
    [70, 65],
  ];

  return (
    <table id="example" className="charts-css line">
      <caption> Fake line data </caption>
      <tbody>
        {line.map(([start, end], i) => {
          return (
            <tr key={"line" + i}>
              <Line start={start} size={end} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
