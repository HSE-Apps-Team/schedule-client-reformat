import axios from "axios";

const url = process.env.REACT_APP_API_URL;

// const url = "https://schedule-client-api.herokuapp.com";
// const url = "http://localhost:5000"

// const url = "http://localhost:5000";
const newsUrl = "https://hsenews.com/wp-json/wp/v2/posts/?categories=493";

export const getSchedule = () => {
  return axios.get(`${url}/schedules`);
};
export const getAnnouncements = () => {
  return axios.get(`${url}/announcements`);
};
export const getLunch = () => {
  return axios.get(`${url}/schedules/lunch`);
};

export const getNewsCasts = () => {
  return axios.get(newsUrl);
};

export const getCalendar = () => {
  console.log("getting calendar");
  return axios.get(`${url}/announcements/calendar`);
};
export const getClock = () => {
  return axios.get(`${url}/announcements/breakclock`);
};

export const getCalendar2 = () => {
  return axios.get(`${url}/announcements/calendar2`);
};

export const getWeather = () => {
  return axios.get(`${url}/weather`);
};

export const getEvents2 = (start, end) => {
  return axios.get(`${url}/calendar/events`, {
    params: { start, end }
  });
};

// Fetch event types (with colors)
export const getEventTypes = () => {
  return axios.get(`${url}/calendar/event_types`);
};

// Fetch day cache
export const getDayCache = (start, end) => {
  return axios.get(`${url}/calendar/day_cache`, {
    params: { start, end }
  });
};
