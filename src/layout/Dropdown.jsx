import Avatar from "../components/Avatar";
import { Link } from "react-router-dom";
import { RightFromBracketIcon } from "../icons";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/use-auth";

export default function Dropdown() {
	const [isopen, setIsOpen] = useState(false);

	// dropdownEl = document.querySelector('.relative')
	const dropdownEl = useRef(null); // { current: null }

	const { logout, authUser } = useAuth(); // authUser = {id, firstName, lastName, profileImage, coverImage}

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (!dropdownEl.current.contains(e.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);
	return (
		<div className="relative" ref={dropdownEl}>
			<div className="cursor-pointer" onClick={() => setIsOpen(!isopen)}>
				<Avatar src={authUser.profileImage} />
			</div>
			{isopen && (
				<div className=" w-96 absolute bg-white right-0 translate-y-1 border rounded-xl shadow-xl p-2">
					<Link
						to={`/profile/${authUser.id}`}
						onClick={() => setIsOpen(false)}
					>
						<div className="flex gap-4 p-2 items-center rounded-xl hover:bg-gray-100 ">
							<Avatar
								className="h-14"
								src={authUser.profileImage}
							/>
							<div>
								<div className="font-semibold">
									{authUser.firstName} {authUser.lastName}
								</div>
								<div className="text-sm text-gray-500">
									See your profile
								</div>
							</div>
						</div>
					</Link>
					<hr className="m-2 border " />
					<div
						className="flex gap-4 p-2 items-center cursor-pointer hover:bg-gray-100 rounded-xl"
						onClick={logout}
					>
						<div className="bg-gray-300 h-9 aspect-square rounded-full flex items-center justify-center">
							<RightFromBracketIcon />
						</div>
						<div className="font-semibold text-sm">Log out</div>
					</div>
				</div>
			)}
		</div>
	);
}
