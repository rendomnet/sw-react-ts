import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RedirectTo from "./components/RedirectTo";
import AppHeader from "./components/AppHeader";
import Grid from "./pages/Grid";
import Edit from "./pages/Edit";
import styled from "styled-components";
import { Container, Box } from "@mui/material";

const App: React.FC = () => {
  return (
    <Wrapper role="main">
      <AppHeader />
      <Box marginTop={2}>
        <Container
          style={{
            height: "calc(100vh - 100px)",
          }}
        >
          <Routes>
            <Route path="/" element={<Grid />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<RedirectTo path="/" />} />
          </Routes>
        </Container>
      </Box>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.main`
  flex: 1;
  flex-direction: column;
  display: flex;
  position: relative;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
`;
