export class UserInfo {
  constructor({
    profileUsernameSelection,
    profileStatusSelection,
    profileAvatarSelection,
  }) {
    this._usernameElement = document.querySelector(profileUsernameSelection);
    this._statusElement = document.querySelector(profileStatusSelection);
    this.avatarSelection = document.querySelector(profileAvatarSelection);
    console.log(profileAvatarSelection);
  }

  getUserInfo() {
    return {
      username: this._usernameElement.textContent,
      status: this._statusElement.textContent,
      avatar: this._avatarSelection.src,
    };
  }

  setUserInfo(title, subtitle, avatar) {
    console.log(avatar);
    this._usernameElement.textContent = title;
    this._statusElement.textContent = subtitle;
    this._avatarSelection = avatar;
  }
}
