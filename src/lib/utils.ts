import { clsx, type ClassValue } from "clsx";
import WordArray from "crypto-js/lib-typedarrays";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomKey(length: number = 16): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";

  const randomValues = WordArray.random(length);
  for (let i = 0; i < length; i++) {
    const byte = (randomValues.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    result += characters[byte % charactersLength];
  }

  return result;
}

export function generateSecretWords(length: number = 32): string {
  const buffer = WordArray.random(length);
  return buffer.toString();
}
