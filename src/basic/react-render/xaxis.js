import { memo, useRef, useEffect } from "react";

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

const Xaxis = ({ scale, label }) => {
  return (
    <g className="xaxis">
      <text className="label">{label}</text>
      {scale.ticks().map((tick) => (
        <Tick key={`x-${tick}`} tick={scale(tick)}>
          <line y1="-15" y2="-20"></line>
          <text x="-10" y="0">
            {tick > 0 && tick}
          </text>
        </Tick>
      ))}
    </g>
  );
};

export default memo(Xaxis);
