import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "../config/axios";
import {
	addAccessToken,
	getAccessToken,
	removeAccessToken,
} from "../utils/local-storage";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
	const [authUser, setAuthUser] = useState(null); // { id: 1, firstName: 'John', lastName: 'Doe', profileImage: '' }
	const [initialLoading, setInitialLoading] = useState(true);

	useEffect(() => {
		if (getAccessToken()) {
			axios
				.get("/auth/me")
				.then((res) => {
					setAuthUser(res.data.user);
				})
				.finally(() => {
					setInitialLoading(false);
				});
		} else {
			setInitialLoading(false);
		}
	}, []);

	const login = async (credential) => {
		// console.log(credential);
		// try {
		const res = await axios.post("/auth/login", credential);
		addAccessToken(res.data.accessToken);
		setAuthUser(res.data.user);
		// } catch (err) {
		// 	console.log(err);
		// }
	};

	const register = async (registerInputObject) => {
		const res = await axios.post("/auth/register", registerInputObject);
		addAccessToken(res.data.accessToken);
		setAuthUser(res.data.user);
	};

	const logout = () => {
		removeAccessToken();
		setAuthUser(null);
	};

	const updateProfile = async (data) => {
		const res = await axios.patch("/user", data);
		setAuthUser({ ...authUser, ...res.data });
	};

	return (
		<AuthContext.Provider
			value={{
				login,
				authUser,
				initialLoading,
				register,
				logout,
				updateProfile,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContextProvider;
