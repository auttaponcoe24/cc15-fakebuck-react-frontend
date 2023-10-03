import Avatar from "../../components/Avatar";
import CoverImage from "./CoverImage";
import PictureForm from "./PictureForm";

export default function EditProfileForm() {
	return (
		<div className="flex flex-col gap-4">
			<PictureForm title="Profile picture">
				{(src) => <Avatar className="h-40" src={src} />}
			</PictureForm>
			<PictureForm title="Cover photo">
				{(src) => (
					<div className="aspect-[3/1] overflow-hidden flex justify-center items-center rounded-md">
						<CoverImage src={src} />
					</div>
				)}
			</PictureForm>
		</div>
	);
}
