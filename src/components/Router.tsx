import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PromptPage } from "../pages/PromptPage";

export const Router: React.FC = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<PromptPage />} />
        </Routes>
    </BrowserRouter>
};