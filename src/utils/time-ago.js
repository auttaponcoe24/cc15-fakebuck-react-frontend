import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export default function formatTimeAgo(date) {
	return timeAgo.format(new Date(date), "mini-now");
}
