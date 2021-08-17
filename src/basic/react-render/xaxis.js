import { useRef, useEffect, useMemo, memo } from "react";

const Tick = ({ tick, children, ...props }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.style.setProperty("--tick", tick + "px"); // manually add for old browsers
  }, [tick]);
  return (
    <g ref={ref} className="tick" {...props}>
      {children}
    </g>
  );
};

const Xaxis = ({ scale, label }) => {
  const ticks = useMemo(() => {
    return scale()
      .ticks()
      .map((value) => ({
        value,
        offset: scale()(value),
      }));
  }, [scale]);
  const [min, max] = scale().range();

  return (
    <g className="xaxis">
      <text className="label">{label}</text>
      <line x1={min} x2={max} y1="-40" y2="-40"></line>

      {ticks.map(({ value, offset }) => (
        <Tick key={`x-${value}`} tick={offset}>
          <line y1="-15" y2="-20"></line>
          <text x="-10" y="0">
            {value > 0 && value}
          </text>
        </Tick>
      ))}
    </g>
  );
};

export default memo(Xaxis);
