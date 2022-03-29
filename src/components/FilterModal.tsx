import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { FilterModalProps } from "../types/Props";

const style = {
  modal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  content: {
    width: "100%",
    paddingTop: "1rem",
  },
  buttonWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  textField: {
    width: "100%",
  },
  button: {
    marginTop: "1rem",
    marginBottom: "0",

    fontSize: "1rem",
  },
};

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#388e3c",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#388e3c",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#66bb6a",
    },
    "&:hover fieldset": {
      borderColor: "#66bb6a",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#388e3c",
    },
  },
});

interface Props extends FilterModalProps {
  handleCloseModal(): void;
  handleApplyFilters(filters: string): void;
}

const defaultFilterValue = "";

function FilterModal({
  isOpened,
  header,
  filter,
  handleCloseModal,
  handleApplyFilters,
}: Props) {
  const [filterValue, setFilterValue] = useState<string>(defaultFilterValue);

  const closeModal = () => {
    setFilterValue(defaultFilterValue);
    handleCloseModal();
  };

  const applyFilters = () => {
    if (!filterValue) {
      // Handle errors
      console.error("Fill in filter");
      handleCloseModal();
      return;
    }
    setFilterValue(defaultFilterValue);
    handleApplyFilters(filterValue);
  };

  const handleTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value as string);
  };

  const handleSelectField = (e: SelectChangeEvent<string>) => {
    setFilterValue(e.target.value as string);
  };

  return (
    <Modal
      keepMounted
      open={isOpened}
      onClose={closeModal}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style.modal}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          {header}
        </Typography>
        <Box sx={style.content}>
          {filter.inputType === "TextField" ? (
            <CssTextField
              sx={style.textField}
              label="Culture"
              id="custom-css-outlined-input"
              value={filterValue}
              onChange={handleTextField}
            />
          ) : (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue}
                label="Age"
                onChange={handleSelectField}
              >
                {filter.options.map((option) => (
                  <MenuItem value={option} key={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Box sx={style.buttonWrapper}>
            <Button
              sx={style.button}
              variant="outlined"
              color="error"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              sx={style.button}
              variant="contained"
              color="primary"
              onClick={applyFilters}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default FilterModal;
