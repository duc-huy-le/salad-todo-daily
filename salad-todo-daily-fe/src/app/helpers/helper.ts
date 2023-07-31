import { JWT_TOKEN } from "../constants/constants";

export enum DateType {
  StartDate = 0,
  FinishDate = 1,
}

export function getFormattedStartDate(originalDate: any, dateType: DateType) {
  let formattedDate = new Date(originalDate);
  if(dateType === DateType.StartDate) {
    formattedDate.setHours(0);
    formattedDate.setMinutes(0);
    formattedDate.setSeconds(0);
  } else if(dateType === DateType.FinishDate) {
    formattedDate.setHours(23);
    formattedDate.setMinutes(59);
    formattedDate.setSeconds(59);
  }
  return formattedDate;
}

function getJwtToken(): string {
  return localStorage.getItem(JWT_TOKEN)!;
}

export function getRequestOption() {
  const token = getJwtToken();
  const headers = { authorization: token };
  return {headers: headers};
}
