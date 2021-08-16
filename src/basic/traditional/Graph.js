import React, { useState, useEffect, useRef } from "react";
import { filter } from "lodash";

import D3Component from "./d3-component";
import "./Graph.css";

let D3Instance;

export default function ReactComponent({ shakespear }) {
  const [data, setData] = useState(null);
  const [width, setWidth] = useState(window.innerWidth / 2);
  const [height, setHeight] = useState(window.innerHeight);
  const [active, setActive] = useState({});
  const refElement = useRef(null);
  
  useEffect(fetchData, [shakespear]);
  useEffect(handleResizeEvent, []);
  useEffect(initD3, [data]);
  useEffect(updateD3OnResize, [width, height]);
  
  function fetchData() {
    const lines = filter(shakespear, (entry) => entry.Player !== "")
    Promise.resolve().then(() => setData(lines));
  }

  function handleResizeEvent() {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        setWidth(window.innerWidth / 2);
        setHeight(window.innerHeight);
      }, 300);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }

  function initD3() {
    if (data?.length) {
      const d3Props = {
        data,
        width,
        height,
        onDatapointClick: setActive,
      };
      D3Instance = new D3Component(refElement.current, d3Props);
    }
  }

  function updateD3OnResize() {
    D3Instance && D3Instance.resize(width, height);
  }

  return (
    <div className="graph">
      <div className="gui">
        <p>Name: {active.Player}</p>
        Line: {active.PlayerLine}
      </div>
      <div ref={refElement} />
    </div>
  );
}
