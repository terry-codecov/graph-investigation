
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { lazy, Suspense} from 'react'
import "./App.css";

import data, { full } from "./data";

// https://medium.com/@stopyransky/react-hooks-and-d3-39be1d900fb
// https://www.redblobgames.com/making-of/line-drawing/#steps


import ChartCSSColumn from "./chartcss/chartcss-column";
import ChartCSSBar from "./chartcss/chartcss-bar";

// import Ant from "./libs/ant";
// import Nvio from "./libs/nvio";
// import Recharts from "./libs/rechart";

const NewGraph = lazy(() => import("./basic/react-render"));
const OldGraph = lazy(() => import("./basic/traditional"));
const Ant = lazy(() => import("./libs/ant"));
const Nvio = lazy(() => import("./libs/nvio"));
const Recharts = lazy(() => import("./libs/rechart"));

export default function App() {
  return (
    <Suspense fallback={null}>
    <Router>
      <div className="App">
        <nav>
          <p>
            Trying various charting methods with react. (Almost) All use D3. The data set is 300 data points.
          </p>
          <ul>
            <li>
              <Link to="/d3-traditional">Traditional D3 API (Bare bones)</Link>
            </li>
            <li>
              <Link to="/d3-react-rendered">D3 powered but React Rendered</Link>
            </li>
            <li>
              <Link to="/ant-design-scatterplot">@ant-design/scatterplot</Link>
            </li>
            <li>
              <Link to="/nvio-scatterplot">Nvio scatterplot</Link>
            </li>
            <li>
              <Link to="/recharts-scatterplot">Recharts scatterplot</Link>
            </li>
            <li>
              <Link to="/css-column">Charts.css column</Link>
            </li>
            <li>
              <Link to="/css-bar">Charts.css scatterplot</Link>
            </li>
          </ul>
          <p>
            (1250 data points) for stress
            testing.
          </p>
          <ul>
            <li>
              <Link to="/d3-traditional-full">Traditional D3 API (Bare bones)</Link>
            </li>
            <li>
              <Link to="/d3-react-rendered-full">D3 powered but React Rendered</Link>
            </li>
            <li>
              <Link to="/ant-design-scatterplot-full">@ant-design/scatterplot</Link>
            </li>
            <li>
              <Link to="/nvio-scatterplot-full">Nvio scatterplot</Link>
            </li>
            <li>
              <Link to="/recharts-scatterplot-full">Recharts scatterplot</Link>
            </li>
            <li>
              <Link to="/css-column-full">Charts.css column</Link>
            </li>
            <li>
              <Link to="/css-bar-full">Charts.css scatterplot</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/d3-traditional">
            <div className="row">
              <div className="explainer">
                <h1>D3 rendered chart</h1>
                <p>
                  This is the traditional charting library mounted with react.
                  Performant how ever I ran into life cycle / timing for
                  mounting and dismounting the instance. This was the first demo
                  so it doesnt include axis's or tooltips but it can be added.
                  Full access to D3's large community of plugins.
                </p>
                <p>
                  The code required to combine the two became complex even with
                  such a simple visualization, I have maintnence concerns
                  because of this. It's be far the hardest to read and
                  understand of all the demos with many caveats.
                </p>
                <p>
                  More features are possible, I just didnt spend the time as I
                  needed to move onto other methods.
                </p>
              </div>
              <OldGraph shakespear={data} />
            </div>
          </Route>
          <Route path="/d3-traditional-full">
            <div className="row">
              <div className="explainer">
                <h1>D3 rendered chart</h1>
                {/* <p>
                  This is the traditional charting library mounted with react.
                  Performant how ever I ran into life cycle / timing for
                  mounting and dismounting the instance. This was the first demo
                  so it doesnt include axis's or tooltips but it can be added.
                  Full access to D3's large community of plugins.
                </p>
                <p>
                  The code required to combine the two became complex even with
                  such a simple visualization, I have maintnence concerns
                  because of this. It's be far the hardest to read and
                  understand of all the demos with many caveats.
                </p>
                <p>
                  More features are possible, I just didnt spend the time as I
                  needed to move onto other methods.
                </p> */}
              </div>
              <OldGraph shakespear={full} />
            </div>
          </Route>
          <Route path="/d3-react-rendered">
            <div className="row">
              <div className="explainer">
                <h1>D3 powered react rendered SVG</h1>
                <p>
                  The implementation is far cleaner then a traditional d3 app at
                  the cost of not having easy access to community plugins and
                  render/selects provided. The "D3" part is handled by various
                  scales (binding the positioning, colors, etc inside a domain
                  and range) and access to things tick calculation (creating
                  charting axis). The rendering has proven highly customizable
                  and looks easy to maintain as it's normal react components /
                  testing.
                </p>
                <p>
                  More features are possible, I just didnt spend the time as I
                  needed to move onto other methods.
                </p>
              </div>
              <NewGraph shakespear={data} />
            </div>
          </Route>
          <Route path="/d3-react-rendered-full">
            <div className="row">
              <div className="explainer">
                <h1>D3 powered react rendered SVG</h1>
                <p>
                  The implementation is far cleaner then a traditional d3 app at
                  the cost of not having easy access to community plugins and
                  render/selects provided. The "D3" part is handled by various
                  scales (binding the positioning, colors, etc inside a domain
                  and range) and access to things tick calculation (creating
                  charting axis). The rendering has proven highly customizable
                  and looks easy to maintain as it's normal react components /
                  testing.
                </p>
                <p>
                  More features are possible, I just didnt spend the time as I
                  needed to move onto other methods.
                </p>
              </div>
              <NewGraph shakespear={full} />
            </div>
          </Route>
          <Route path="/ant-design-scatterplot-full">
            <div className="row">
              <div className="explainer">
                <h1>@ant-design/scatterplot</h1>
                <p>
                  Ant Design's graphing library (has many chart types). I
                  quickly brush up against it's limitations, both in the data
                  rendered (must be a numerical value) and control over what
                  data is rendered on hover and its format was extremely
                  limited.) The documentation is half english half chinese,
                  making it difficult to go further. I quickly abandoned this
                  demo. Performance under stress it also quickly failed (slow
                  load times), however once loaded it is performant under
                  stress.
                </p>
              </div>
              <Ant shakespear={full} />
            </div>
          </Route>
          <Route path="/ant-design-scatterplot">
            <div className="row">
              <div className="explainer">
                <h1>@ant-design/scatterplot</h1>
                <p>
                  Ant Design's graphing library (has many chart types). I
                  quickly brush up against it's limitations, both in the data
                  rendered (must be a numerical value) and control over what
                  data is rendered on hover and its format was extremely
                  limited.) The documentation is half english half chinese,
                  making it difficult to go further. I quickly abandoned this
                  demo. Performance under stress it also quickly failed (slow
                  load times), however once loaded it is performant under
                  stress.
                </p>
              </div>
              <Ant shakespear={data} />
            </div>
          </Route>
          <Route path="/nvio-scatterplot-full">
            <div className="row">
              <div className="explainer">
                <h1>Nvio scatterplot</h1>
                <p>
                  By far has the best documentation. It loads slowly initially
                  and there are many re renders on hover (which it shouldnt), it
                  also sadly is using a deprecated react API so there's dev
                  warnings. This means it could cause issues with version
                  upgrades. Major browser slowdown with large data sets
                </p>
              </div>
              <Nvio shakespear={full} />
            </div>
          </Route>
          <Route path="/nvio-scatterplot">
            <div className="row">
              <div className="explainer">
                <h1>Nvio scatterplot</h1>
                <p>
                  By far has the best documentation. It loads slowly initially
                  and there are many re renders on hover (which it shouldnt), it
                  also sadly is using a deprecated react API so there's dev
                  warnings. This means it could cause issues with version
                  upgrades. Major browser slowdown with large data sets
                </p>
              </div>
              <Nvio shakespear={data} />
            </div>
          </Route>
          <Route path="/recharts-scatterplot-full">
            <div className="row">
              <div className="explainer">
                <h1>Recharts scatterplot</h1>
                <p>
                  Easily set up, relatively good performance under stress,
                  however customization is very limited. Unable to configure the
                  toolips values. Limited visuals. Rerenders on hover, hover
                  effects kinda weird and locked in.
                </p>
              </div>
              <Recharts shakespear={full} />
            </div>
          </Route>
          <Route path="/recharts-scatterplot">
            <div className="row">
              <div className="explainer">
                <h1>Recharts scatterplot</h1>
                <p>
                  Easily set up, relatively good performance under stress,
                  however customization is very limited. Unable to configure the
                  toolips values. Limited visuals. Rerenders on hover, hover
                  effects kinda weird and locked in.
                </p>
              </div>
              <Recharts shakespear={data} />
            </div>
          </Route>
          <Route path="/css-column-full">
            <div className="row">
              <div className="explainer">
                <h1>Charts CSS - Column</h1>
                <p>
                  Highly performant, accessible, requires more manual configs
                  depending on the data provided (easily fixed but not modified
                  for the stress test). Hover state is CSS powered and will some
                  times be limited in terms of accuracy due to how it's rendered
                  (It's a table). Though it has less features in terms of
                  interactivity, it's highly customizable, performant, and
                  supports screen readers and printing.
                </p>
                <p>
                  Charts CSS currently has 4 graph types with more in
                  development. It's powered by css and css variables, to
                  integrat with react well I used a useEffect hook per tr and
                  use the browsers vanilla API to update the variable to
                  represent the plot point.
                </p>
                <p>
                  Dev tip, try inspecting the table and removing the classes.
                  :eyes:
                </p>
              </div>
              <ChartCSSColumn shakespear={full} />
            </div>
          </Route>
          <Route path="/css-column">
            <div className="row">
              <div className="explainer">
                <h1>Charts CSS - Column</h1>
                <p>
                  Highly performant, accessible, requires more manual configs
                  depending on the data provided (easily fixed but not modified
                  for the stress test). Hover state is CSS powered and will some
                  times be limited in terms of accuracy due to how it's rendered
                  (It's a table). Though it has less features in terms of
                  interactivity, it's highly customizable, performant, and
                  supports screen readers and printing.
                </p>
                <p>
                  Charts CSS currently has 4 graph types with more in
                  development. It's powered by css and css variables, to
                  integrat with react well I used a useEffect hook per tr and
                  use the browsers vanilla API to update the variable to
                  represent the plot point.
                </p>
                <p>
                  Dev tip, try inspecting the table and removing the classes.
                  :eyes:
                </p>
              </div>
              <ChartCSSColumn shakespear={data} />
            </div>
          </Route>
          <Route path="/css-bar-full">
            <div className="row">
              <div className="explainer">
                <h1>Charts CSS - Bar</h1>
                <p>
                  Highly performant, accessible, requires more manual configs
                  depending on the data provided (easily fixed but not modified
                  for the stress test). Hover state is CSS powered and will some
                  times be limited in terms of accuracy due to how it's rendered
                  (It's a table). Though it has less features in terms of
                  interactivity, it's highly customizable, performant, and
                  supports screen readers and printing.
                </p>
                <p>
                  Charts CSS currently has 4 graph types with more in
                  development. It's powered by css and css variables, to
                  integrat with react well I used a useEffect hook per tr and
                  use the browsers vanilla API to update the variable to
                  represent the plot point.
                </p>
                <p>
                  Dev tip, try inspecting the table and removing the classes.
                  :eyes:
                </p>
              </div>
              <ChartCSSBar shakespear={full} />
            </div>
          </Route>
          <Route path="/css-bar">
            <div className="row">
              <div className="explainer">
                <h1>Charts CSS - Bar</h1>
                <p>
                  Highly performant, accessible, requires more manual configs
                  depending on the data provided (easily fixed but not modified
                  for the stress test). Hover state is CSS powered and will some
                  times be limited in terms of accuracy due to how it's rendered
                  (It's a table). Though it has less features in terms of
                  interactivity, it's highly customizable, performant, and
                  supports screen readers and printing.
                </p>
                <p>
                  Charts CSS currently has 4 graph types with more in
                  development. It's powered by css and css variables, to
                  integrat with react well I used a useEffect hook per tr and
                  use the browsers vanilla API to update the variable to
                  represent the plot point.
                </p>
                <p>
                  Dev tip, try inspecting the table and removing the classes.
                  :eyes:
                </p>
              </div>
              <ChartCSSBar shakespear={data} />
            </div>
          </Route>
          <Route path="/"></Route>
        </Switch>
      </div>
    </Router>
    </Suspense>
  );
}
