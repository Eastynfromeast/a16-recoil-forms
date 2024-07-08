import React from "react";
import { useForm } from "react-hook-form";
import { ICountryInput, ICountry, Categories, countrySelector, countryState } from "./atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

function App() {
	const [want, visited, fav] = useRecoilValue(countrySelector);

	const { register, handleSubmit, reset } = useForm<ICountryInput>();
	const setCountries = useSetRecoilState(countryState);

	const onValid = ({ country }: ICountryInput) => {
		setCountries(prev => [...prev, { id: Date.now(), countryName: country, category: Categories.Want }]);
		reset();
	};

	const onClickBtn = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
		const {
			currentTarget: { name },
		} = e;

		setCountries((prevCountries: ICountry[]) => {
			const targetIndex = prevCountries.findIndex(country => country.id === id);
			const newCountry: ICountry = { id: id, countryName: prevCountries[targetIndex].countryName, category: name as any };

			return [...prevCountries.slice(0, targetIndex), newCountry, ...prevCountries.slice(targetIndex + 1)];
		});
	};

	const onClickDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
		setCountries(prevCountries => {
			return prevCountries.filter(country => country.id !== id);
		});
	};

	return (
		<main>
			<h2>내가 가고싶은 나라들</h2>
			<form onSubmit={handleSubmit(onValid)}>
				<input
					{...register("country", {
						required: "나라 이름이 입력되어야 합니다.",
						pattern: {
							value: /^[ㄱ-ㅎ가-힣a-zA-z\s]*$/,
							message: "한글과 영문 알파벳맛 입력 가능합니다.",
						},
					})}
					placeholder="가고 싶은 나라의 이름을 적어 보세요."
				/>
				<button>Let's Go!</button>
			</form>
			<ul>
				{want.map(country => (
					<li key={country.id}>
						<span>{country.countryName}</span>
						<button name={Categories.Visited} onClick={e => onClickBtn(e, country.id)}>
							✅
						</button>
						<button onClick={e => onClickBtn(e, country.id)}>🗑️</button>
					</li>
				))}
			</ul>
			<h2>내가 가 본 나라들</h2>
			<ul>
				{visited.map(country => (
					<li key={country.id}>
						<span>{country.countryName}</span>
						<button name={Categories.Fav} onClick={e => onClickBtn(e, country.id)}>
							✅
						</button>
						<button name={Categories.Want} onClick={e => onClickBtn(e, country.id)}>
							🗑️
						</button>
					</li>
				))}
			</ul>
			<h2>내가 좋아하는 나라들</h2>
			<ul>
				{fav.map(country => (
					<li key={country.id}>
						<span>{country.countryName}</span>
						<button name={"fav"} onClick={e => onClickBtn(e, country.id)}>
							✅
						</button>
						<button name={Categories.Visited} onClick={e => onClickBtn(e, country.id)}>
							🗑️
						</button>
					</li>
				))}
			</ul>
		</main>
	);
}

export default App;
