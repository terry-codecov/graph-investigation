import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Also crazy re renders
const rechart = ({ shakespear }) => {
  const data = shakespear.reduce((prev, curr) => {
    return [...prev, { x: curr.Dataline, y: curr.PlayerLine.length, ...curr }];
  }, []);
  return (
    <div style={{ width: "50vw", height: "100vh" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="line" unit="" />
          <YAxis type="number" dataKey="y" name="characters" unit="" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="Henry V" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default rechart;
