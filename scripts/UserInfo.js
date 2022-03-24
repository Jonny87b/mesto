export class UserInfo {
  constructor({ profileUsernameSelection, profileStatusSelection }) {
    this._usernameElement = document.querySelector(profileUsernameSelection);
    this._statusElement = document.querySelector(profileStatusSelection);
  }

  getUserInfo() {
    return {
      username: this._usernameElement.textContent,
      status: this._statusElement.textContent,
    };
  }

  setUserInfo(title, subtitle) {
    this._usernameElement.textContent = title;
    this._statusElement.textContent = subtitle;
  }
}
