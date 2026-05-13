import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount: number, currency: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatCardNumber = (cardNumber: string) => {
  return cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
};

export const maskCardNumber = (cardNumber: string) => {
  return `•••• ${cardNumber.slice(-4)}`;
};