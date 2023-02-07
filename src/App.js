import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import LoginPage from "./features/Login/pages";
import MainPage from "./features/MainPage/pages";
import NotFound from "./features/404/pages";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/main" element={<MainPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

const Layout = styled.div``;

export default App;
