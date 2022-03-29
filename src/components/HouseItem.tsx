import { Box, Grid } from "@mui/material";
import React from "react";

type Props = {
  children: any;
  title: string;
  getter?(param: any): () => string | false;
};

function HouseItem({ children, title, getter }: Props) {
  const handleGet = () => {
    console.log(children, getter);

    if (getter) return getter(children);
    return children;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Box>{title}</Box>
      </Grid>
      <Grid item xs={8}>
        <Box>{handleGet}</Box>
      </Grid>
    </Grid>
  );
}

HouseItem.defaultProps = {
  getter: () => {
    return false;
  },
};

export default HouseItem;
