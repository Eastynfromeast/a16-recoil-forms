import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ICountryInput, ICountry, Categories } from "./atoms";

function App() {
	const { register, handleSubmit, reset } = useForm<ICountryInput>();
	const [countries, setCountries] = useState<ICountry[]>([]);

	const onValid = ({ country }: ICountryInput) => {
		console.log(country);
		setCountries(prev => [...prev, { id: Date.now(), countryName: country, category: Categories.Want }]);
		reset();
	};

	const onClickBtn = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
		const {
			currentTarget: { name },
		} = e;

		setCountries((prevCountries: ICountry[]) => {
			const targetIndex = prevCountries.findIndex(country => country.id === id);
			const newCountry: ICountry = { id: id, category: name as any, countryName: prevCountries[targetIndex].countryName };
			return [...prevCountries.slice(0, targetIndex), newCountry, ...prevCountries.slice(targetIndex + 1)];
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
			{countries &&
				countries.map(country => (
					<li key={country.id}>
						<span>{country.countryName}</span>
						{country.category === "want" && (
							<>
								<button name={"visited"} onClick={e => onClickBtn(e, country.id)}>
									✅
								</button>
								<button>🗑️</button>
							</>
						)}
					</li>
				))}
			<h2>내가 가 본 나라들</h2>

			<h2>내가 좋아하는 나라들</h2>
		</main>
	);
}

export default App;
