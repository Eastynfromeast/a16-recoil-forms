import { useForm } from "react-hook-form";
import { countryState } from "../utils/atoms";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, ICountryInput } from "../utils/types";

const CountryInput = styled.input`
	box-sizing: border-box;
	display: block;
	width: 100%;
	margin: 0 auto 15px;
	padding: 15px;
	&:focus {
		border: 1px solid ${props => props.theme.accentColor};
	}
`;

const SubmitBtn = styled.button`
	display: block;
	width: 100%;
	padding: 15px;
	background-color: rgba(0, 0, 0, 0.5);
	text-align: center;
	border-radius: 10px;
	transition: all 0.2s ease-in;
	&:hover {
		background-color: ${props => props.theme.accentColor};
	}
`;

const ErrorText = styled.p`
	color: ${props => props.theme.errorColor};
	font-weight: 600;
`;

function CountryForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ICountryInput>();

	const setCountries = useSetRecoilState(countryState);

	const onValid = ({ country }: ICountryInput) => {
		setCountries(prev => [...prev, { id: Date.now(), countryName: country, category: Categories.Want }]);
		reset();
	};
	return (
		<>
			<form onSubmit={handleSubmit(onValid)}>
				<CountryInput
					{...register("country", {
						required: "가고 싶은 나라의 이름을 한글 혹은 영문으로 적어 주세요:)",
						pattern: {
							value: /^[ㄱ-ㅎ가-힣a-zA-z\s]*$/,
							message: "한글과 영문 알파벳맛 입력 가능합니다. 다시 시도해 주세요.",
						},
					})}
					placeholder="가고 싶은 나라의 이름을 적어 보세요."
				/>
				{errors?.country && <ErrorText>{errors.country.message}</ErrorText>}
				<SubmitBtn>Let's Go!</SubmitBtn>
			</form>
		</>
	);
}

export default CountryForm;
