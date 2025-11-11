import React from "react";
import { CssBaseline, Container } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/queryClient";

import MainNav from "./routes/MainNav";
import AnimalsPage from "./pages/AnimalsPage";
import AnimalDetails from "./pages/AnimalDetails";
import AdminPage from "./pages/AdminPage";
import ExploreBreeds from "./pages/ExploreBreeds";
import PrivateRoute from "./routes/PrivateRoute";

import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <BrowserRouter>
          <MainNav />
          <Container maxWidth="md" className="app-container">
            <Routes>
              <Route path="/" element={<Navigate to="/animals" replace />} />
              <Route path="/animals" element={<AnimalsPage />} />
              <Route path="/animals/:id" element={<AnimalDetails />} />
              <Route path="/explore" element={<ExploreBreeds />} />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminPage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<div>Página não encontrada</div>} />
            </Routes>
          </Container>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
