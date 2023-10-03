import { useState } from "react";
import { toast } from "react-toastify";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";
import { useAuth } from "../../hooks/use-auth";

function LoginForm() {
	const [input, setInput] = useState({
		emailOrMobile: "",
		password: "",
	});

	const { login } = useAuth();

	const handleSubmitForm = (e) => {
		e.preventDefault();
		login(input).catch((err) => {
			toast.error(err.response?.data.message);
		});
	};

	// sent request
	// localstorage.setItem('accessToken')
	// state => user
	return (
		<>
			{/* <form>
            <div className="grid gap-4">
            <div>
                <input
                className="w-full rounded-md px-4 py-3.5 border border-red-500 outline-none focus:ring-1 focus:ring-red-300"
                placeholder="Email address or phone number"
                />
                <small className="text-xs text-red-500">Email address or phone number is required.</small>
            </div>
            <div>
                <input
                className="w-full rounded-md px-4 py-3.5 border border-gray-300 focus:border-blue-500 outline-none focus:ring-1 focus:ring-blue-300"
                placeholder="Password"
                />
            </div>
            <button className="w-full bg-[#1877f2] text-xl text-white font-bold px-4 leading-[3rem] rounded-md">
                Log in
            </button>
            </div>
        </form> */}
			<form onSubmit={handleSubmitForm}>
				<div className="grid gap-4">
					<div>
						<LoginInput
							placeholder="Email address or phone number"
							value={input.emailOrMobile}
							onChange={(e) =>
								setInput({
									...input,
									emailOrMobile: e.target.value,
								})
							}
						/>
					</div>
					<div>
						<LoginInput
							type="password"
							placeholder="Password"
							value={input.password}
							onChange={(e) =>
								setInput({ ...input, password: e.target.value })
							}
						/>
					</div>
					<div>
						<LoginButton text="Log In" />
					</div>
				</div>
			</form>
		</>
	);
}

export default LoginForm;
