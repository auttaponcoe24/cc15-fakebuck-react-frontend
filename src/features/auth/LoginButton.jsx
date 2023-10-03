import React from "react";

function LoginButton({ text }) {
	return (
		<button className="bg-blue-500 text-white w-full rounded-md text-xl fout-bold py-2.5">
			{text}
		</button>
	);
}

export default LoginButton;
