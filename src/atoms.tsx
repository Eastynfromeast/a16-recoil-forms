import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum Categories {
	"Want" = "Want",
	"Visited" = "Visited",
	"Fav" = "Fav",
}

export interface ICountry {
	id: number;
	countryName: string;
	category: Categories;
}

export interface ICountryInput {
	country: string;
}

export const categoryState = atom<Categories>({
	key: "cateogry",
	default: Categories.Want,
});

const { persistAtom } = recoilPersist({
	key: "countryLocal",
	storage: localStorage,
});

export const countryState = atom<ICountry[]>({
	key: "country",
	default: [],
	effects_UNSTABLE: [persistAtom],
});

export const countrySelector = selector({
	key: "countrySelector",
	get: ({ get }) => {
		const countries = get(countryState);
		const category = get(categoryState);
		return [
			countries.filter(country => country.category === Categories.Want),
			countries.filter(country => country.category === Categories.Visited),
			countries.filter(country => country.category === Categories.Fav),
		];
	},
});
