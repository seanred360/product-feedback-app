import { useDarkMode } from "./components/styled-components/useDarkMode";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/styled-components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/styled-components/Themes";
import Main from "./components/Main";
import NavBar from "./components/common/NavBar";
import NavBar2 from "./components/NavBar2";

const App = () => {
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!mountedComponent) return <div />;
  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <NavBar />
        <NavBar2 />
        <div className="App">
          <Main />
        </div>
      </>
    </ThemeProvider>
  );
};
export default App;
