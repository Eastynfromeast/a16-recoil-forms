import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./theme/theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<RecoilRoot>
			<ThemeProvider theme={defaultTheme}>
				<App />
			</ThemeProvider>
		</RecoilRoot>
	</React.StrictMode>
);
