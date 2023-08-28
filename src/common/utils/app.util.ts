import { Auth } from "aws-amplify";
import moment from "moment";
import { addNotificationAction } from "../../app-redux/settings/settingsSlice";
import { AppMessages } from "./app.messages";
// get current user time zone
const offsetOfCurrentUser = new Date().getTimezoneOffset();

export function getDefaultValue(value: string | undefined | null) {
  if (value === undefined || value === null) return "";
  return value;
}

export function getCurrentDateTime(format = "YYYY-MM-DDTHH:mm") {
  return moment().format(format);
}

/*
 *   Convert UTC to local time
 */
export function getLocalDateTime(date: string | null | undefined, format = "YYYY-MM-DDTHH:mm") {
  return date ? moment.utc(date).local().format(format) : null;
}

export function getUTCDateTime(date: string | null | undefined) {
  return !date || date === "" ? null : moment.utc(new Date(date)).format("YYYY-MM-DDTHH:mm");
}
// Add time to date and convert dateTime to utc wrt current login User (for End date)
export function getUTCDateTimeWithEndOfDay(date: string | null | undefined) {
  return !date || date === ""
    ? null
    : moment
        .utc(new Date(date))
        .endOf("day")
        .utcOffset(offsetOfCurrentUser)
        .format("YYYY-MM-DDTHH:mm");
}
// Add time to date and convert dateTime to utc wrt current login User (for start date)
export function getUTCDateTimeWithStartOfDay(date: string | null | undefined) {
  return !date || date === ""
    ? null
    : moment
        .utc(new Date(date))
        .startOf("day")
        .utcOffset(offsetOfCurrentUser)
        .format("YYYY-MM-DDTHH:mm");
}

export async function getAccessJwtToken() {
  // Auth.currentSession() checks if token is expired and refreshes with Cognito if needed automatically
  const session = await Auth.currentSession();
  return session.getIdToken().getJwtToken();
}

const setDateTimeToLocal = (date: string | null): string | null => {
  const res = date ? moment.utc(date).local().format("YYYY-MM-DDTHH:mm") : null;
  return res;
};

const setDateToLocal = (date: string | null): string | null => {
  const res = date ? moment.utc(date).local().format("YYYY-MM-DD") : null;
  return res;
};

const setDateField = (date: string | null): string | null => {
  const res = !date || date === "" ? null : moment.utc(new Date(date as string)).format();
  return res;
};

export function showNotification(notiMessage: string, variant: any, dispatch: any) {
  dispatch(
    addNotificationAction({
      message: AppMessages.get(notiMessage) || notiMessage,
      options: { variant: variant },
    })
  );
}

export { setDateTimeToLocal, setDateField, setDateToLocal };

export function getTimezoneName() {
  const today = new Date();
  const short = today.toLocaleDateString(undefined);
  const full = today.toLocaleDateString(undefined, { timeZoneName: "long" });

  // Trying to remove date from the string in a locale-agnostic way
  const shortIndex = full.indexOf(short);
  if (shortIndex >= 0) {
    const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);

    // by this time `trimmed` should be the timezone's name with some punctuation -// trim it from both sides
    return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, "");
  } else {
    // in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's namereturn full;
  }
}

export const buildFormData = (formData: FormData, data: any, parentKey?: string) => {
  if (Array.isArray(data)) {
    data.forEach((el) => {
      buildFormData(formData, el, parentKey);
    });
  } else if (typeof data === "object" && !(data instanceof File)) {
    Object.keys(data).forEach((key) => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}.${key}` : key);
    });
  } else {
    if (!data) {
      return;
    }

    const value = typeof data === "boolean" || typeof data === "number" ? data.toString() : data;
    formData.append(parentKey as string, value);
  }
};
