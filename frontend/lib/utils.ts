import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from 'date-fns';
import { UserType } from "@/types/auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeSince = (dateString: string): string => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}
export function extractErrorValues(response: any) {
  const values = [];
  for (const key in response) {
    if (Array.isArray(response[key])) {
      values.push(response[key][0].replace("This field", `The ${key} field`));
    }
  }
  if (values.length == 0) {
    return null
  }
  return values;
}
export function pluralize(value: any, key: string) {
  if (value.length >= 2) {
    if (key.endsWith('y')) {
      return key.slice(key.length - 1, key.length) + 'ies'
    } else {
      return key + "s"
    }
  } else {
    return key
  }
}
type AvatarOptions = "original" | "thumbnail" | "medium_square_crop" | "small_square_crop";
export function getUserAvatar(user: UserType, option: AvatarOptions = 'original') {
  return user?.profile_picture?.[option]
}