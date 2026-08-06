export function isValidEmail(value: string): boolean {
  return /^\S+@\S+\.\S+$/.test(value.trim());
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function isValidCardNumber(value: string): boolean {
  return /^\d{13,19}$/.test(value.replace(/\s/g, ""));
}

export function isValidExpiry(value: string): boolean {
  return /^\d{2}\/\d{2}$/.test(value.trim());
}

export function isValidCvc(value: string): boolean {
  return /^\d{3,4}$/.test(value.trim());
}

export function isValidPassword(value: string, minLength = 6): boolean {
  return value.length >= minLength;
}
