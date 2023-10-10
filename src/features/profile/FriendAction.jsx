import { useParams } from "react-router-dom";
import ActionButton from "./ActionButton";
import axios from "../../config/axios";

export default function FriendAction({ setStatusWithAuthUser }) {
	const { profileId } = useParams();

	const handleClickUnFrined = async () => {
		try {
			await axios.delete(`/friend/${profileId}/unfriend`);
			setStatusWithAuthUser("UNKNOWN");
		} catch (err) {
			console.log(err);
		}
	};
	return <ActionButton onClick={handleClickUnFrined}>Unfriend</ActionButton>;
}
