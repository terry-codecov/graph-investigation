import { memo, useRef, useMemo, useEffect } from "react";

const Tick = memo(({ tick, children, ...props }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.style.setProperty("--tick", tick + "px"); // manually add for old browsers
  }, [tick]);
  return (
    <g ref={ref} className="tick" {...props}>
      {children}
    </g>
  );
});

const Yaxis = ({ scale, label }) => {
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
    <g className="yaxis">
      <text className="label">{label}</text>
      <line x1="40" x2="40" y1={min} y2={max}></line>
      {ticks.map(({ value, offset }) => (
        <Tick key={`y-${value}`} tick={offset}>
          <line x1="-5" x2="0"></line>
          <text x="-30" y="0.32em">
            {value > 0 && value}
          </text>
        </Tick>
      ))}
    </g>
  );
};

export default memo(Yaxis);
