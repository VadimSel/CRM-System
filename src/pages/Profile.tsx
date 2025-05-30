import { useEffect, useState } from "react";
import { GetProfile } from "../api";
import { ApiErrorHandler } from "../utils/ApiErrorHandler";
import { ProfileType } from "../types";

export const Profile = () => {
	const [profile, setProfile] = useState<ProfileType>();

	const getProfileInfo = async () => {
		try {
			setProfile(await GetProfile());
		} catch (error) {
			ApiErrorHandler(error);
		}
	};

	useEffect(() => {
		getProfileInfo();
	}, []);

	return (
		<div>
      <p>Имя пользователя: {profile?.username}</p>
      <p>Почтовый адрес: {profile?.email}</p>
      <p>Телефон: {profile?.phoneNumber}</p>
		</div>
	);
};
