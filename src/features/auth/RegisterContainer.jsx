import { useState } from "react";
import Modal from "../../components/Modal";
import RegisterForm from "./RegisterForm";

export default function RegisterContainer() {
	const [isOpen, setIsopen] = useState(false);
	return (
		<div className="flex justify-center">
			<button
				onClick={() => setIsopen(true)}
				className="bg-green-500 text-white rounded-md px-4 font-bold"
			>
				Create new account
			</button>

			<Modal
				className=""
				title="Sign up"
				open={isOpen}
				onClose={() => setIsopen(false)}
			>
				<RegisterForm />
			</Modal>
		</div>
	);
}
