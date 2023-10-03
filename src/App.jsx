import { ToastContainer } from "react-toastify";
import Loading from "./components/Loading";
import { useAuth } from "./hooks/use-auth";
import Route from "./router/Route";

function App() {
	const { initialLoading } = useAuth();
	if (initialLoading) {
		return <Loading />;
	}

	return (
		<>
			<Route />
			<ToastContainer position="bottom-center" autoClose={3000} />
		</>
	);
}

export default App;
