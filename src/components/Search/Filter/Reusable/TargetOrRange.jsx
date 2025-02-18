"use client";

import { RANGE, TARGET } from "@/lib/constants";
import { Slider } from "@mui/material";

export default function TargetOrRange({
  title,
  onSlider,
  type,
  setType,
  value,
  setValue,
  disabled,
  ...props
}) {
  return (
    <div className={`space-y-2 ${type === TARGET ? "pb-6" : ""}`}>
      <div className={`flex items-center justify-between gap-4`}>
        <h3 className={`font-medium`}>{title}</h3>

        {/* Toggle */}
        <div className={`-mr-1 flex rounded-full bg-base-100 p-1`}>
          <button
            onClick={() => setType(TARGET)}
            className={`btn btn-xs rounded-full ${type === TARGET ? "btn-primary text-black" : "border-0 bg-base-100"}`}
          >
            Target
          </button>
          <button
            onClick={() => setType(RANGE)}
            className={`btn btn-xs rounded-full ${type === RANGE ? "btn-primary text-black" : "border-0 bg-base-100"}`}
          >
            Range
          </button>
        </div>
      </div>

      {/* Input */}
      <div>
        <div className={`px-2`}>
          <Slider
            {...props}
            aria-label={title}
            valueLabelDisplay={type === TARGET ? "auto" : "off"}
            value={value}
            onChange={(e, value) => setValue(value)}
            onChangeCommitted={(e, value) => onSlider(value)}
            disabled={disabled}
            sx={{
              color: "#ff6337",

              "& .MuiSlider-thumb": {
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",

                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "0 0 0 6px #ff633750",
                },
                "&.Mui-active": {
                  boxShadow: "0 0 0 12px #ff633750",
                },
              },

              "& .MuiSlider-valueLabel": {
                background: "#000",
                borderRadius: "9999px",
                // width: "2.5rem",
                height: "1.5rem",
                top: "55px",

                "&:before": {
                  display: "none",
                },
              },
            }}
          />
        </div>

        {/* Input range by text */}
        {type === RANGE && (
          <div className={`-mx-3 flex items-center justify-between`}>
            <input
              type="text"
              value={value[0]}
              className={`h-6 w-10 rounded-full bg-black text-center text-sm text-white`}
            />

            <input
              type="text"
              value={value[1]}
              className={`h-6 w-10 rounded-full bg-black text-center text-sm text-white`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
