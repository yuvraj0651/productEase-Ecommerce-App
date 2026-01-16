import { useState } from 'react';
import ThemeContext from "../Theme/ThemeContext";

const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState("light");

    const themeToggler = () => {
        setTheme((prev) => prev === "light" ? "dark" : "light");
    }

    return (
        <ThemeContext.Provider value={{theme , themeToggler}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider