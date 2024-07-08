import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface ICountry {
	country: string;
}

interface ICountryArr {
	id: number;
	countryName: string;
	category: "want" | "visited" | "fav";
}

function App() {
	const { register, handleSubmit, reset } = useForm<ICountry>();
	const [wants, setWants] = useState<ICountryArr[]>([]);
	const [favs, setFavs] = useState<ICountryArr[]>([]);
	const onValid = ({ country }: ICountry) => {
		console.log(country);
		setWants(prev => [...prev, { id: Date.now(), countryName: country, category: "want" }]);
		reset();
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
			<h2>내가 가 본 나라들</h2>
			{wants &&
				wants.map(want => (
					<li key={want.id}>
						<span>{want.countryName}</span>
						{want.category === "want" && (
							<>
								<button>✅</button>
								<button>🗑️</button>
							</>
						)}
					</li>
				))}
			<h2>내가 좋아하는 나라들</h2>
			{favs && favs.map(fav => <li key={fav.id}>{fav.countryName}</li>)}
		</main>
	);
}

export default App;
