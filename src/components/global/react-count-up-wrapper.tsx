"use client";

import React, { useEffect } from "react";
import Countup from "react-countup";
type Props = { value: number };

function ReactCountUp({ value }: Props) {
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <div className="animate-pulse h-4 w-16 bg-gray-200 rounded"></div>;
  }
  return <Countup end={value} preserveValue decimals={0} duration={0.5} />;
}

export default ReactCountUp;
