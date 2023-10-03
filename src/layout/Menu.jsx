import { HouseIcon, UserGroupIcon } from "../icons";
import MenuItem from "./MenuItem";
import { useLocation } from "react-router-dom";

const menus = [
	{ id: 1, to: "/", Icon: HouseIcon },
	{ id: 2, to: "/friend", Icon: UserGroupIcon },
];

export default function Menu() {
	const { pathname } = useLocation();
	return (
		<nav className="flex justify-center items-center gap-2">
			{menus.map((items) => (
				<MenuItem
					key={items.id}
					to={items.to}
					Icon={items.Icon}
					active={pathname === items.to}
				/>
			))}
		</nav>
	);
}
