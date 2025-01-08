import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";


export const RouterComponent: FC = () => {

    return (
        <Routes>
            <Route path='/' element={< HomePage />} />
            {/* < Route path="/openNew" element={< OpenNew />} /> */}
        </Routes>
    )
}