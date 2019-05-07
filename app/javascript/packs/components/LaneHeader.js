import React from "react";

const LaneHeader = props => {
  const { id, cards, total_count } = props;
  return (
    <div>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <b>{id}</b> ({cards.length}/{total_count})
    </div>
  );
};

export default LaneHeader;
