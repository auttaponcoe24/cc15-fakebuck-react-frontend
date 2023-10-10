import { useEffect, useState, useRef } from "react";

function useDropdown() {
	const [isOpen, setIsOpen] = useState(false);

	// dropdownEl = document.querySelector('.relative')
	const dropdownEl = useRef(null); // { current: null }

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (!dropdownEl.current?.contains(e.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	return { dropdownEl, isOpen, setIsOpen };
}

export default useDropdown;
