import { useRecoilValue } from "recoil";
import { countrySelector } from "../utils/atoms";
import CountryForm from "./CountryForm";
import Country from "./Country";
import { styled } from "styled-components";

const ListContainer = styled.main`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	max-width: 480px;
	padding: 30px 15px;
	margin: 0 auto;
`;

function CountryList() {
	const [want, visited, fav] = useRecoilValue(countrySelector);

	return (
		<ListContainer>
			<h2>내가 가고싶은 나라들</h2>
			<CountryForm />
			<ul>{want && want.map(country => <Country key={country.id} {...country} />)}</ul>
			<h2>내가 가 본 나라들</h2>
			<ul>{visited && visited.map(country => <Country key={country.id} {...country} />)}</ul>
			<h2>내가 좋아하는 나라들</h2>
			<ul>{fav && fav.map(country => <Country key={country.id} {...country} />)}</ul>
		</ListContainer>
	);
}

export default CountryList;
