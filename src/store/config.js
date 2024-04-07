const BASE_URL = "http://localhost:3001/";

export const ALL_USERS = BASE_URL + "users";

export const userById = (id) => BASE_URL + "users/" + id;
