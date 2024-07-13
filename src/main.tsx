import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import DataContextProvider from "./store/context/DataContext";
import MainContextProvider from "./store/context/MainContext";
import ModuleContextProvider from "./store/context/ModuleContext";
import ReadmeContextProvider from "./store/context/ReadmeContext";
import SelectedFileContextProvider from "./store/context/SelectedFileContext.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SelectedFileContextProvider>
      <DataContextProvider>
        <MainContextProvider>
          <ModuleContextProvider>
            <ReadmeContextProvider>
            <ToastContainer />
              <Router>
                <Routes>
                  <Route path="/python-playground" element={<App />} />
                </Routes>
              </Router>
            </ReadmeContextProvider>
          </ModuleContextProvider>
        </MainContextProvider>
      </DataContextProvider>
    </SelectedFileContextProvider>
  </React.StrictMode>
);
