class AccessTokenManager {
	private accessToken = "";

	setToken(token: string) {
		this.accessToken = token;
	}

	getToken() {
		return this.accessToken;
	}

	clearToken() {
		this.accessToken = "";
	}
}

export const accessTokenManager = new AccessTokenManager();
