import moment from "moment";

export function formatDate(date) {
    if (date instanceof Date) {
      return moment(date).format("YYYY-MM-DD");
    }
    if (typeof date === "string") {
      return moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
    }
    return "";
  }
  
  export function truncateText(text = '', maxLength = 30) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }