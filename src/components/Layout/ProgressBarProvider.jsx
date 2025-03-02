"use client";

import { AppProgressProvider as ProgressBar } from "@bprogress/next";

const Providers = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="2px"
        color="#ff6337"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default Providers;
