export enum Categories {
	"Want" = "want",
	"Visited" = "visited",
	"Fav" = "fav",
}

export interface ICountry {
	id: number;
	countryName: string;
	category: Categories;
}

export interface ICountryInput {
	country: string;
}
