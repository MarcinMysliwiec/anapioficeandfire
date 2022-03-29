import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CharacterDataService from "../services/CharacterService";
import ICharacterData from "../types/Character";
import { ApiParams, FilterModalProps, PaginateProps } from "../types/Props";
import AllegianceCell from "./AllegianceCell";
import AliveCell from "./AliveCell";
import CultureCell from "./CultureCell";
import FilterCell from "./FilterCell";
import FilterModal from "./FilterModal";

const initialApiParams: ApiParams = {
  page: 1,
  pageSize: 10,
};

const initialPaginationData: PaginateProps = {
  count: 2138,
  rowsPerPage: [10, 25, 50],
};

const initialModalData: FilterModalProps = {
  isOpened: false,
  header: null,
  filter: {
    name: null,
    inputType: null,
    options: [],
  },
};

function CharactersList() {
  const [apiParams, setApiParams] = useState<ApiParams>(initialApiParams);
  const [characters, setCharacters] = useState<Array<ICharacterData>>([]);
  const [pagination] = useState<PaginateProps>(initialPaginationData);
  const [modalData, setModalData] =
    useState<FilterModalProps>(initialModalData);

  const changeIsOpened = (isOpened: boolean): void =>
    setModalData({ ...modalData, isOpened });

  const changePage = (page: number): void => {
    setApiParams({
      ...apiParams,
      page,
    });
  };

  const changePageSize = (pageSize: number): void => {
    setApiParams({
      ...apiParams,
      pageSize,
    });
  };

  const changeGender = (gender: string): void => {
    setApiParams({
      ...apiParams,
      gender,
    });
  };

  const changeCulture = (culture: string): void => {
    setApiParams({
      ...apiParams,
      culture,
    });
  };

  const fetchData = (props: ApiParams): void => {
    CharacterDataService.fetch(props)
      .then((data: ICharacterData[]) => {
        setCharacters([...data]);
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };

  const handleCloseModal = (): void => changeIsOpened(false);

  const handleApplyFilters = (filterValue: string): void => {
    if (modalData.filter.name === "Culture") {
      changeCulture(filterValue);
    } else if (modalData.filter.name === "Gender") {
      changeGender(filterValue);
    }
    handleCloseModal();
  };

  const handleClearFilters = (children: string): void => {
    const stateApiParams = { ...apiParams };
    if (children === "Culture") delete stateApiParams.culture;
    if (children === "Gender") delete stateApiParams.gender;
    setApiParams({ ...stateApiParams });
  };

  const handleChangePage = (event: unknown, page: number): void => {
    changePage(page + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    changePageSize(parseInt(event.target.value, 10));
  };

  const handleOpenGenderFilter = (): void => {
    setModalData({
      isOpened: true,
      header: "Change filter for Gender",
      filter: {
        name: "Gender",
        inputType: "Select",
        options: ["Any", "Male", "Female"],
      },
    });
  };

  const handleOpenCultureFilter = (): void => {
    setModalData({
      isOpened: true,
      header: "Change filter for Culture",
      filter: {
        name: "Culture",
        inputType: "TextField",
        options: [],
      },
    });
  };

  useEffect(() => {
    fetchData(apiParams);
  }, [apiParams]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom component="div">
        Characters List
      </Typography>
      <Paper>
        <FilterModal
          isOpened={modalData.isOpened}
          header={modalData.header}
          filter={modalData.filter}
          handleCloseModal={handleCloseModal}
          handleApplyFilters={handleApplyFilters}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Character Name</TableCell>
                <TableCell>Aliases</TableCell>
                <TableCell>Alive</TableCell>
                <FilterCell
                  apiPayload={apiParams}
                  handleClick={handleOpenGenderFilter}
                  handleClearFilters={handleClearFilters}
                >
                  Gender
                </FilterCell>
                <FilterCell
                  apiPayload={apiParams}
                  handleClick={handleOpenCultureFilter}
                  handleClearFilters={handleClearFilters}
                >
                  Culture
                </FilterCell>
                <TableCell>Allegiances</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {characters.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.aliases}</TableCell>
                  <AliveCell>{row}</AliveCell>
                  <TableCell>{row.gender}</TableCell>
                  <CultureCell>{row}</CultureCell>
                  <AllegianceCell>{row}</AllegianceCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={pagination.rowsPerPage}
          component="div"
          count={pagination.count}
          rowsPerPage={apiParams.pageSize}
          page={apiParams.page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton
          showLastButton
        />
      </Paper>
    </Box>
  );
}

export default CharactersList;
