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
  )
});

const Yaxis = ({ scale, label }) => {
  return (
    <g className="yaxis">
      <text className="label">{label}</text>
      {scale.ticks().map((tick) => (
        <Tick key={`y-${tick}`} tick={scale(tick)}>
          <line x1="15" x2="20"></line>
          <text x="-9" y="0.32em">
            {tick > 0 && tick}
          </text>
        </Tick>
      ))}
    </g>
  );
};

export default memo(Yaxis);
