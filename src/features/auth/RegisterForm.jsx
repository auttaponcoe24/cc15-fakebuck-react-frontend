import RegisterInput from "./RegisterInput";
import { toast } from "react-toastify";
import { useState } from "react";
import Joi from "joi";
import InputErrorMessage from "./InputErrorMessage";
import { useAuth } from "../../hooks/use-auth";

const registerSchema = Joi.object({
	firstName: Joi.string().trim().required(),
	lastName: Joi.string().trim().required(),
	emailOrMobile: Joi.alternatives([
		Joi.string().email({ tlds: false }),
		Joi.string().pattern(/^[0-9]{10}$/),
	]).required(),
	password: Joi.string()
		.pattern(/^[a-zA-Z0-9]{6,30}$/)
		.trim()
		.required(),
	confirmPassword: Joi.string().valid(Joi.ref("password")).trim().required(),
});

const validateRegister = (input) => {
	const { error } = registerSchema.validate(input, { abortEarly: false });
	// console.dir(error);
	if (error) {
		const result = error.details.reduce((acc, el) => {
			const { message, path } = el;
			acc[path[0]] = message;
			return acc;
		}, {});
		return result;
	}
};

export default function RegisterForm() {
	const [input, setInput] = useState({
		firstName: "",
		lastName: "",
		emailOrMobile: "",
		password: "",
		confirmPassword: "",
	});

	const [error, setError] = useState({});

	const { register } = useAuth();

	const handleChangeInput = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const handleSubmitForm = (e) => {
		e.preventDefault();
		const validationError = validateRegister(input);
		if (validationError) {
			return setError(validationError);
		}
		setError({});
		register(input).catch((err) => {
			toast.error(err.response?.data.message);
		});
	};
	return (
		<form
			onSubmit={handleSubmitForm}
			className="grid grid-cols-2 gap-x-3 gap-y-4"
		>
			<div>
				<RegisterInput
					placeholder="First Name"
					value={input.firstName}
					onChange={handleChangeInput}
					name="firstName"
					hasError={error.firstName}
				/>
				{error.firstName && (
					<InputErrorMessage message={error.firstName} />
				)}
			</div>
			<div>
				<RegisterInput
					placeholder="Last Name"
					value={input.lastName}
					onChange={handleChangeInput}
					name="lastName"
					hasError={error.lastName}
				/>
				{error.lastName && (
					<InputErrorMessage message={error.lastName} />
				)}
			</div>
			<div className="col-span-full">
				<RegisterInput
					placeholder="Email address or mobile number"
					value={input.emailOrMobile}
					onChange={handleChangeInput}
					name="emailOrMobile"
					hasError={error.emailOrMobile}
				/>
				{error.emailOrMobile && (
					<InputErrorMessage message={error.emailOrMobile} />
				)}
			</div>
			<div className="col-span-full">
				<RegisterInput
					placeholder="Password"
					value={input.password}
					onChange={handleChangeInput}
					name="password"
					hasError={error.password}
					type="password"
				/>
				{error.password && (
					<InputErrorMessage message={error.password} />
				)}
			</div>
			<div className="col-span-full">
				<RegisterInput
					placeholder="Confirm password"
					value={input.confirmPassword}
					onChange={handleChangeInput}
					name="confirmPassword"
					hasError={error.confirmPassword}
					type="password"
				/>
				{error.confirmPassword && (
					<InputErrorMessage message={error.confirmPassword} />
				)}
			</div>
			<div className="col-span-full mx-auto">
				<button className="bg-green-500 rounded-lg text-white px-3 text-lg font-bold min-w-[10rem]">
					Sign up
				</button>
			</div>
		</form>
	);
}
