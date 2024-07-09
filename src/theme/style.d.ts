import { DefaultTheme } from "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		accentColor: string;
		errorColor: string;
	}
}
