let accessToken = "";

export const accessTokenManager = {
	setToken(token: string) {
		accessToken = token;
	},
	getToken() {
		return accessToken;
	},
	clearToken() {
		accessToken = "";
	},
};
