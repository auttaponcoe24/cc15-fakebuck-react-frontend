import { useState } from "react";
import Avatar from "../../components/Avatar";
import { useAuth } from "../../hooks/use-auth";
import CoverImage from "./CoverImage";
import PictureForm from "./PictureForm";
import Loading from "../../components/Loading";

export default function EditProfileForm({ onSuccess }) {
	const [loading, setLoading] = useState(false);
	const { authUser, updateProfile } = useAuth();

	const uploadProfileImage = async (input) => {
		// FormData
		try {
			const formData = new FormData();
			formData.append("profileImage", input);
			setLoading(true);
			await updateProfile(formData);
			onSuccess();
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const uploadCoverImage = async (input) => {
		try {
			const formData = new FormData();
			formData.append("coverImage", input);
			setLoading(true);
			await updateProfile(formData);
			onSuccess();
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="flex flex-col gap-4">
			{loading && <Loading />}
			<PictureForm
				title="Profile picture"
				initialSrc={authUser.profileImage}
				onSave={uploadProfileImage}
			>
				{(src, onClick = { onClick }) => (
					<Avatar className="h-40" src={src} />
				)}
			</PictureForm>
			<PictureForm
				title="Cover photo"
				initialSrc={authUser.coverImage}
				onSave={uploadCoverImage}
			>
				{(src, onClick = { onClick }) => (
					<div className="aspect-[3/1] overflow-hidden flex justify-center items-center rounded-md">
						<CoverImage src={src} />
					</div>
				)}
			</PictureForm>
		</div>
	);
}
