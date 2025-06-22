import { notification } from "antd";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { getProfile } from "../api/authApi";
import { ProfileType } from "../types/authTypes";

export const Profile = () => {
	const [profile, setProfile] = useState<ProfileType>();

	const getProfileInfo = async () => {
		try {
			setProfile(await getProfile());
		} catch (error) {
			if (isAxiosError(error) && error.response) {
				notification.error({
					message: error.response.status === 400 ? "Пользователя не существует" : String(error),
					placement: "top",
				});
			}
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
