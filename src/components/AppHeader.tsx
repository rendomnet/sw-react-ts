import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Paper,
  Box,
  Popover,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Close } from "@mui/icons-material";

const AppHeader = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get("search") || "";

  const [searchValue, setSearch] = useState(searchParam);
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      navigate(`/?page=1&search=${searchValue}`);
    }
  };

  const openSearchBox = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeSearchBox = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      style={{ backgroundColor: "#123456" }}
    >
      <Toolbar>
        <Box sx={{ marginRight: 2 }}>
          <img
            src="/logo512.png"
            alt="Icon"
            style={{
              width: isMobile ? "25px" : "30px",
              height: isMobile ? "25px" : "30px",
            }}
          />
        </Box>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/`)}
        >
          StarWars
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="secondary" onClick={openSearchBox}>
              <Search style={isMobile && { color: "white" }} />
            </IconButton>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={closeSearchBox}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Paper
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 300,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onKeyUp={handleKeyPress}
                  inputProps={{ "aria-label": "search starwars" }}
                />
                {searchParam && (
                  <IconButton
                    aria-label="cancel"
                    onClick={() => navigate(`/)`)}
                  >
                    <Close />
                  </IconButton>
                )}
              </Paper>
            </Popover>
          </>
        ) : (
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchChange}
              onKeyUp={handleKeyPress}
              inputProps={{ "aria-label": "search starwars" }}
            />
            <IconButton
              aria-label="search"
              onClick={() => navigate(`/?page=1&search=${searchValue}`)}
            >
              <Search />
            </IconButton>
            {searchParam && (
              <IconButton aria-label="cancel" onClick={() => navigate(`/`)}>
                <Close />
              </IconButton>
            )}
          </Paper>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
