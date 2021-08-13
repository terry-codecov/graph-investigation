import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { filter, uniqBy } from "lodash";

// Many re renderes, performance concerns. Not sure how to customize hover content. Looks customizable
// Using depricated react internal calls :(
const MyResponsiveScatterPlot = ({ shakespear }) => {
  const formatted = shakespear.reduce((prev, curr) => {
    return [...prev, { x: curr.Dataline, y: curr.PlayerLine.length, ...curr }];
  }, []);
  const players = uniqBy(formatted, (d) => d.Player);
  const data = Object.values(players).map((player) => ({
    id: player.Player,
    data: filter(formatted, (d) => d.Player === player.Player),
  }));

  return (
    <div style={{ height: "100vh", width: "50vw" }}>
      <ResponsiveScatterPlot
        data={data}
        margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
        xScale={{ type: "linear", min: 0, max: "auto" }}
        xFormat={function (e) {
          return " Line" + e;
        }}
        yScale={{ type: "linear", min: 0, max: "auto" }}
        yFormat={function (e) {
          return e + " Characters";
        }}
        blendMode="multiply"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "line",
          legendPosition: "middle",
          legendOffset: 46,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "characters",
          legendPosition: "middle",
          legendOffset: -60,
        }}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 130,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 12,
            itemsSpacing: 5,
            itemDirection: "left-to-right",
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default MyResponsiveScatterPlot;
