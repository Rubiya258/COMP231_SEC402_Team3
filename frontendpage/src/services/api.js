const BASE_URL = "http://localhost:8080";

export const API = {
  REGISTER: `${BASE_URL}/api/users/register`,
  LOGIN: `${BASE_URL}/api/users/login`,
  USER: `${BASE_URL}/api/users`,
  UPDATE_USER: `${BASE_URL}/api/users/update`,
  DELETE_USER: `${BASE_URL}/api/users/delete`,
};

export const REMINDER_API = {
  ADD: `${BASE_URL}/api/reminders/add`,
  BY_USER: (userId) => `${BASE_URL}/api/reminders/user/${userId}`,
  GET_ONE: (id) => `${BASE_URL}/api/reminders/get/${id}`,
  UPDATE: (id) => `${BASE_URL}/api/reminders/update/${id}`,
  DELETE: (id) => `${BASE_URL}/api/reminders/delete/${id}`,
};

export const NOTIFICATION_API = {
  CREATE: `${BASE_URL}/notifications`,
  UPDATE: (id) => `${BASE_URL}/notifications/${id}`,
  BY_REMINDER: (id) => `${BASE_URL}/notifications/reminder/${id}`,
};

