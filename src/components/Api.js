class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _customFetch(url, options) {
    return fetch(url, options).then((res) =>
      res.ok ? res.json() : Promise.reject(res.status)
    );
  }

  getProfile() {
    return this._customFetch(`${this._baseUrl}/users/me `, {
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._customFetch(`${this._baseUrl}/cards  `, {
      headers: this._headers,
    });
  }
  getEditProfile(name, about) {
    return this._customFetch(`${this._baseUrl}/users/me  `, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }
  getAddCards(name, link) {
    return this._customFetch(`${this._baseUrl}/cards  `, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }
  getDeleteCard(id) {
    return this._customFetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
  getAddLike(id) {
    return this._customFetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }
  getDeleteLike(id) {
    return this._customFetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
  editAvatar(avatar) {
    return this._customFetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "07dbe690-781f-4ec5-838d-5c1c76fc6965",
    "Content-Type": "application/json",
  },
});
