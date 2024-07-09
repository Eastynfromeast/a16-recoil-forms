import { useSetRecoilState } from "recoil";
import { countryState } from "../utils/atoms";
import { Categories, ICountry } from "../utils/types";
import styled from "styled-components";

const Btn = styled.button`
	display: inline-block;
	transition: all 0.2s ease-in;
	margin: 0 3px;
	&:hover {
		background-color: ${props => props.theme.accentColor};
	}
`;

const BackBtn = styled(Btn)`
	&:hover {
		background-color: ${props => props.theme.errorColor};
	}
`;

function Country({ id, countryName, category }: ICountry) {
	const setCountries = useSetRecoilState(countryState);

	const ChangeCategory = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
		const {
			currentTarget: { name },
		} = e;

		setCountries((prevCountries: ICountry[]) => {
			const targetIndex = prevCountries.findIndex(country => country.id === id);
			const newCountry: ICountry = { id: id, countryName: prevCountries[targetIndex].countryName, category: name as any };

			return [...prevCountries.slice(0, targetIndex), newCountry, ...prevCountries.slice(targetIndex + 1)];
		});
	};

	const Delete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
		setCountries(prevCountries => {
			return prevCountries.filter(country => country.id !== id);
		});
	};

	return (
		<>
			<li key={id}>
				<span>{countryName}</span>
				{category === Categories.Want && (
					<>
						<Btn name={Categories.Visited} onClick={e => ChangeCategory(e, id)}>
							✅
						</Btn>
						<BackBtn onClick={e => Delete(e, id)}>🗑️</BackBtn>
					</>
				)}
				{category === Categories.Visited && (
					<>
						<Btn name={Categories.Fav} onClick={e => ChangeCategory(e, id)}>
							🫶
						</Btn>
						<BackBtn name={Categories.Want} onClick={e => ChangeCategory(e, id)}>
							❌
						</BackBtn>
					</>
				)}
				{category === Categories.Fav && (
					<BackBtn name={Categories.Visited} onClick={e => ChangeCategory(e, id)}>
						👎
					</BackBtn>
				)}
			</li>
		</>
	);
}

export default Country;
