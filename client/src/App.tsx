import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PrivateRoute";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PublicRoute from "./routes/PublicRoute";
import { useThemeContext } from "./theme/ThemeContextProvider";
import { ThemeProvider, CssBaseline } from "@mui/material";

function App() {
  const { theme } = useThemeContext();
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />}></Route>
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Route>
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
