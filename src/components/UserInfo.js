export class UserInfo {
  constructor({
    profileUsernameSelection,
    profileStatusSelection,
    profileAvatarSelection,
  }) {
    this._usernameElement = document.querySelector(profileUsernameSelection);
    this._statusElement = document.querySelector(profileStatusSelection);
    this._avatarSelection = document.querySelector(profileAvatarSelection);
    console.log(profileAvatarSelection);
  }

  getUserInfo() {
    return {
      username: this._usernameElement.textContent,
      status: this._statusElement.textContent,
      avatar: this._avatarSelection.src,
    };
  }

  setUserInfo(username, status, avatar) {
    console.log(avatar);
    this._usernameElement.textContent = username;
    this._statusElement.textContent = status;
    this._avatarSelection.src = avatar;
  }
}
