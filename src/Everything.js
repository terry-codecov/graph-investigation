import trimmed from "./data";

// https://medium.com/@stopyransky/react-hooks-and-d3-39be1d900fb
// https://www.redblobgames.com/making-of/line-drawing/#steps
import OldGraph from "./basic/traditional";
import NewGraph from "./basic/react-render";

import ChartCSSColumn from "./chartcss/chartcss-column";
import ChartCSSBar from "./chartcss/chartcss-bar";
import ChartCSSLine from "./chartcss/chartcss-line";
import ChartCSSArea from "./chartcss/chartcss-area";

import Ant from "./libs/ant";
import Nvio from "./libs/nvio";
import Recharts from "./libs/rechart";

function App() {
  return (
    <>
      <div className="row"></div>
      <div className="row">
        <h3>Traditional D3</h3>
        <h3>Rendering in react</h3>
      </div>
      <div className="row">
        <OldGraph shakespear={trimmed} />
        <NewGraph shakespear={trimmed} />
      </div>
      <div className="row">
        <h3>Recharts</h3>
        <h3>Nvio</h3>
      </div>
      <div className="row">
        <Recharts shakespear={trimmed} />
        <Nvio shakespear={trimmed} />
      </div>
      <div className="row">
        <h3>Ant Design</h3>
      </div>
      <div className="row">
        <Ant shakespear={trimmed} />
      </div>
      <div className="row">
        <h3>Chart.css</h3>
      </div>
      <div className="row">
        <ChartCSSColumn shakespear={trimmed} />
        <ChartCSSBar shakespear={trimmed} />
      </div>
      <div className="row">
        <ChartCSSLine shakespear={trimmed} />
        <ChartCSSArea shakespear={trimmed} />
      </div>
    </>
  );
}

export default App;
