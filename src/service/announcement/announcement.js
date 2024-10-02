import fetch from "../../config/interceptor/interceptor";
import { BaseUrl, APIS } from "../../config/constants/URLS";

export const createAnnouncement = (data) => {
  return fetch({
    method: "post",
    url: BaseUrl + APIS.ANNOUNCEMENT.createAnnouncement,
    data,
    headers: { "Content-Type": "application/json" },
  });
};

export const fetchAnnouncement = (id) => {
  return fetch({
    method: "get",
    url: BaseUrl + APIS.ANNOUNCEMENT.fetchAnnouncement(id),
  });
};

export const fetchAllAnnouncements = (pageNumber, sortedBY) => {
  return fetch({
    method: "get",
    url:
      BaseUrl +
      APIS.ANNOUNCEMENT.fetchAllAnnouncements(
        pageNumber,
        sortedBY
      ),
  });
};

export const updateAnnouncement = (id, data) => {
  return fetch({
    method: "put",
    url: BaseUrl + APIS.ANNOUNCEMENT.updateAnnouncement(id),
    data,
  });
};

export const deleteAnnouncementById = (id) => {
  return fetch({
    method: "delete",
    url: BaseUrl + APIS.ANNOUNCEMENT.deleteAnnouncement(id),
  });
};
