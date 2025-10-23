import React from "react";
import { ShimmerPostList } from "react-shimmer-effects";

const ShimmerLoader = () => {
  return (
    <div className="p-6">
      <ShimmerPostList postStyle="STYLE_SEVEN" col={2} row={2} gap={20} />
    </div>
  );
};

export default ShimmerLoader;
