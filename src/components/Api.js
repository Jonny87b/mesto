// import { reject } from "core-js/fn/promise";

class Api {
  constructor({ baseUrl, headers }) {
    // тело конструктора
    this._headers = headers;
    this._baseUrl = baseUrl;
  }
  getProfile() {
    return fetch(`${this._baseUrl}/users/me `, {
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch(console.log);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards  `, {
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch(console.log);
  }
  getEditProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me  `, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch(console.log);
  }
  getAddCards(name, link) {
    return fetch(`${this._baseUrl}/cards  `, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch(console.log);
  }
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.all.reject(res.status)))
      .catch(console.log);
  }

  // другие методы работы с API
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "07dbe690-781f-4ec5-838d-5c1c76fc6965",
    "Content-Type": "application/json",
  },
});
