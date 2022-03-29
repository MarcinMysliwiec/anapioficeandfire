import { Box, TableCell } from "@mui/material";
import React from "react";
import { Close, FilterAltOutlined } from "@mui/icons-material";
import { ApiParams } from "../types/Props";

const cellStyle = {
  display: "flex",
};

type Props = {
  children: string;
  apiPayload: ApiParams;
  handleClick: () => void;
  handleClearFilters: (children: string) => void;
};

function FilterCell({
  children,
  apiPayload,
  handleClick,
  handleClearFilters,
}: Props) {
  return (
    <TableCell>
      <Box sx={cellStyle}>
        {children} <FilterAltOutlined onClick={handleClick} />
        {children.toLowerCase() in apiPayload && (
          <Close onClick={() => handleClearFilters(children)} />
        )}
      </Box>
    </TableCell>
  );
}

export default FilterCell;
