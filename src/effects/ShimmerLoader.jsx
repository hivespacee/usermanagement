import React from "react";
import { ShimmerPostList } from "react-shimmer-effects";

const ShimmerLoader = () => {
  return (
    <div className="p-6">
      {/* Example shimmer for cards or list items */}
      <ShimmerPostList postStyle="STYLE_ONE" col={2} row={1} gap={30} />
    </div>
  );
};

export default ShimmerLoader;
