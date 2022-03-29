import { Box, TableCell } from "@mui/material";
import React from "react";
import { Close, FilterAltOutlined } from "@mui/icons-material";
import { ApiParams } from "../types/Props";

const cellStyle = {
  display: "flex",
};

const style = {
  button: {
    cursor: "pointer",
  },
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
        {children} <FilterAltOutlined sx={style.button} onClick={handleClick} />
        {children.toLowerCase() in apiPayload && (
          <Close
            sx={style.button}
            onClick={() => handleClearFilters(children)}
          />
        )}
      </Box>
    </TableCell>
  );
}

export default FilterCell;
