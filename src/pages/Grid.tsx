import React, { useCallback, FC, useEffect } from "react";
import moment from "moment";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { IconButton, Stack, Pagination } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import useMediaQuery from "@mui/material/useMediaQuery";
import useCharacters from "../hooks/useCharacters";

interface PeopleGridProps {}

const PeopleGrid: FC<PeopleGridProps> = () => {
  const {
    getPersonList,
    searchPerson,
    count,
    isLoading,
    characters,
    openPersonPage,
  } = useCharacters();

  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page") || "1";

  const activePage = parseInt(page);

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: activePage - 1,
  });

  useEffect(() => {
    if (search) searchPerson(search, activePage);
    else getPersonList(activePage);
    setPaginationModel({
      pageSize: 10,
      page: activePage - 1,
    });
  }, [activePage, search]);

  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value.toString());
    navigate(`/?${searchParams.toString()}`);
  }

  const countPages = useCallback((count: number) => {
    return Math.ceil(count / 10);
  }, []);

  function CustomPagination() {
    return (
      <Stack spacing={2}>
        <Pagination
          count={countPages(count)}
          shape="rounded"
          page={activePage}
          onChange={handlePageChange}
        />
      </Stack>
    );
  }

  let columns: GridColDef[];

  if (isMobile) {
    columns = [
      { field: "name", headerName: "Name", flex: 1 },
      {
        field: "edit",
        headerName: "",
        width: 60, // adjusted for mobile
        renderCell: (params) => {
          return (
            <IconButton
              size="small" // smaller icon for mobile
              color="primary"
              onClick={() => {
                openPersonPage(params.row);
              }}
            >
              <EditIcon />
            </IconButton>
          );
        },
      },
    ];
  } else {
    columns = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Name", flex: 1 },
      { field: "eye_color", headerName: "Eye color", width: 130 },
      { field: "height", headerName: "Height", width: 90 },
      {
        field: "edited",
        headerName: "Last edited",
        width: 200,
        renderCell: (params) => moment(params.value).format("LL"),
      },
      {
        field: "edit",
        headerName: "",
        width: 80,
        renderCell: (params) => {
          return (
            <IconButton
              color="primary"
              onClick={() => {
                openPersonPage(params.row);
              }}
            >
              <EditIcon />
            </IconButton>
          );
        },
      },
    ];
  }

  return (
    <DataGrid
      rows={characters}
      columns={columns}
      paginationModel={paginationModel}
      paginationMode="server"
      rowCount={count}
      loading={isLoading}
      pageSizeOptions={[10]}
      slots={{
        pagination: CustomPagination,
      }}
    />
  );
};

export default PeopleGrid;
