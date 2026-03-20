export enum Bool {
  TRUE = 1,
  FALSE = 0,
}

export enum Account {
  CAPITAL_ONE_SAVOR = "CAPITAL_ONE_SAVOR",
  CAPITAL_ONE_QUICKSILVER = "CAPITAL_ONE_QUICKSILVER",
  CAPITAL_ONE_CHECKING = "CAPITAL_ONE_CHECKING",
  APPLE_CARD = "APPLE_CARD",
  APPLE_SAVINGS = "APPLE_SAVINGS",
}

export const AccountNames = {
  [Account.CAPITAL_ONE_SAVOR]: "Capital One Savor",
  [Account.CAPITAL_ONE_QUICKSILVER]: "Capital One Quicksilver",
  [Account.CAPITAL_ONE_CHECKING]: "Capital One Checking",
  [Account.APPLE_CARD]: "Apple Card",
  [Account.APPLE_SAVINGS]: "Apple Savings",
};

export enum Category {
  COMPENSATION = "COMPENSATION",
  BANKING_REWARDS = "BANKING_REWARDS",
  INCOME_MISC = "INCOME_MISC",
  HEALTH = "HEALTH",
  HOUSING = "HOUSING",
  EDUCATION = "EDUCATION",
  GROCERIES = "GROCERIES",
  SUPPLIES = "SUPPLIES",
  TRANSPORTATION = "TRANSPORTATION",
  UTILITIES = "UTILITIES",
  AUTO_LOANS_MINIMUM = "AUTO_LOANS_MINIMUM",
  INSURANCE = "INSURANCE",
  ESSENTIAL_SERVICES = "ESSENTIAL_SERVICES",
  ESSENTIAL_MISC = "ESSENTIAL_MISC",
  DINING_ENTERTAINMENT = "DINING_ENTERTAINMENT",
  SHOPPING = "SHOPPING",
  TRIPS_TRAVEL = "TRIPS_TRAVEL",
  SUBSCRIPTIONS = "SUBSCRIPTIONS",
  HOBBIES = "HOBBIES",
  CHARITY = "CHARITY",
  GIFTS = "GIFTS",
  ELECTIVE_SERVICES = "ELECTIVE_SERVICES",
  ELECTIVE_MISC = "ELECTIVE_MISC",
  ELECTIVE_HIDDEN = "ELECTIVE_HIDDEN",
  GENERAL_FUND_INVESTMENT = "GENERAL_FUND_INVESTMENT",
  PROJECT_FUND_INVESTMNET = "PROJECT_FUND_INVESTMNET",
  PRIVATE_FUND_INVESTMENT = "PRIVATE_FUND_INVESTMENT",
  AUTO_LOANS_EXTRA = "AUTO_LOANS_EXTRA",
}

export const CategoryNames = {
  [Category.COMPENSATION]: "Compensation",
  [Category.BANKING_REWARDS]: "Banking Rewards",
  [Category.INCOME_MISC]: "Income Misc",
  [Category.HEALTH]: "Health",
  [Category.HOUSING]: "Housing",
  [Category.EDUCATION]: "Education",
  [Category.GROCERIES]: "Groceries",
  [Category.SUPPLIES]: "Supplies",
  [Category.TRANSPORTATION]: "Transportation",
  [Category.UTILITIES]: "Utilities",
  [Category.AUTO_LOANS_MINIMUM]: "Auto Loans Minimum",
  [Category.INSURANCE]: "Insurance",
  [Category.ESSENTIAL_SERVICES]: "Essential Services",
  [Category.ESSENTIAL_MISC]: "Essential Misc",
  [Category.DINING_ENTERTAINMENT]: "Dining & Entertainment",
  [Category.SHOPPING]: "Shopping",
  [Category.TRIPS_TRAVEL]: "Trips & Travel",
  [Category.SUBSCRIPTIONS]: "Subscriptions",
  [Category.HOBBIES]: "Hobbies",
  [Category.CHARITY]: "Charity",
  [Category.GIFTS]: "Gifts",
  [Category.ELECTIVE_SERVICES]: "Elective Services",
  [Category.ELECTIVE_MISC]: "Elective Misc",
  [Category.ELECTIVE_HIDDEN]: "Elective Hidden",
  [Category.GENERAL_FUND_INVESTMENT]: "General Fund Investment",
  [Category.PROJECT_FUND_INVESTMNET]: "Project Fund Investment",
  [Category.PRIVATE_FUND_INVESTMENT]: "Private Fund Investment",
  [Category.AUTO_LOANS_EXTRA]: "Auto Loans Extra",
};

export enum Group {
  INCOME = "INCOME",
  ESSENTIAL = "ESSENTIAL",
  ELECTIVE = "ELECTIVE",
  INVESTMENT = "INVESTMENT",
}

export const GroupNames = {
  [Group.INCOME]: "Income",
  [Group.ESSENTIAL]: "Essential",
  [Group.ELECTIVE]: "Elective",
  [Group.INVESTMENT]: "Investment",
};

export const Groups = {
  [Category.COMPENSATION]: Group.INCOME,
  [Category.BANKING_REWARDS]: Group.INCOME,
  [Category.INCOME_MISC]: Group.INCOME,
  [Category.HEALTH]: Group.ESSENTIAL,
  [Category.HOUSING]: Group.ESSENTIAL,
  [Category.EDUCATION]: Group.ESSENTIAL,
  [Category.GROCERIES]: Group.ESSENTIAL,
  [Category.SUPPLIES]: Group.ESSENTIAL,
  [Category.TRANSPORTATION]: Group.ESSENTIAL,
  [Category.UTILITIES]: Group.ESSENTIAL,
  [Category.AUTO_LOANS_MINIMUM]: Group.ESSENTIAL,
  [Category.INSURANCE]: Group.ESSENTIAL,
  [Category.ESSENTIAL_SERVICES]: Group.ESSENTIAL,
  [Category.ESSENTIAL_MISC]: Group.ESSENTIAL,
  [Category.DINING_ENTERTAINMENT]: Group.ELECTIVE,
  [Category.SHOPPING]: Group.ELECTIVE,
  [Category.TRIPS_TRAVEL]: Group.ELECTIVE,
  [Category.SUBSCRIPTIONS]: Group.ELECTIVE,
  [Category.HOBBIES]: Group.ELECTIVE,
  [Category.CHARITY]: Group.ELECTIVE,
  [Category.GIFTS]: Group.ELECTIVE,
  [Category.ELECTIVE_SERVICES]: Group.ELECTIVE,
  [Category.ELECTIVE_MISC]: Group.ELECTIVE,
  [Category.ELECTIVE_HIDDEN]: Group.ELECTIVE,
  [Category.GENERAL_FUND_INVESTMENT]: Group.INVESTMENT,
  [Category.PROJECT_FUND_INVESTMNET]: Group.INVESTMENT,
  [Category.PRIVATE_FUND_INVESTMENT]: Group.INVESTMENT,
  [Category.AUTO_LOANS_EXTRA]: Group.INVESTMENT,
};

/**
 * Given a category name (e.g. "Dining & Entertainment"), return the proper category (e.g. "DINING_ENTERTAINMENT").
 */
export function getProperCategory(category: string): Category | null {
  for (const [key, value] of Object.entries(CategoryNames)) {
    if (value === category) return key as Category;
  }
  return null;
}

export enum Tag {
  PICASSO = "PICASSO",
  ICELAND = "ICELAND",
}

export const TagNames = {
  [Tag.PICASSO]: "Picasso",
  [Tag.ICELAND]: "Iceland",
};

/**
 * Given a tag name (e.g. "Picasso"), return the proper tag (e.g. "PICASSO").
 */
export function getProperTag(tag: string): Tag | null {
  for (const [key, value] of Object.entries(TagNames)) {
    if (value === tag) return key as Tag;
  }
  return null;
}

export enum Month {
  JANUARY = "January",
  FEBRUARY = "February",
  MARCH = "March",
  APRIL = "April",
  MAY = "May",
  JUNE = "June",
  JULY = "July",
  AUGUST = "August",
  SEPTEMBER = "September",
  OCTOBER = "October",
  NOVEMBER = "November",
  DECEMBER = "December",
}

export function getMonthNumber(month: Month): number {
  return Object.values(Month).indexOf(month) + 1;
}

export interface Transaction {
  id?: number;
  key: string;
  day: number;
  month: number;
  year: number;
  amount: number;
  credit: Bool.FALSE | Bool.TRUE;
  merchant: string;
  merchantCategory: string;
  category: string;
  account: Account;
  description: string;
  notes: string;
  tags?: string[];
  skipped: Bool.FALSE | Bool.TRUE;
  reviewed: Bool.FALSE | Bool.TRUE;
}

export interface Rule {
  id?: number;
  merchant: string;
  merchantCategory: string;
  category: string;
}

export interface C1CreditRecord {
  "Transaction Date": string;
  "Posted Date": string;
  "Card No.": string;
  Description: string;
  Category: string;
  Debit: string;
  Credit: string;
}

export interface C1CheckingRecord {
  "Account Number": string;
  "Transaction Date": string;
  "Transaction Amount": string;
  "Transaction Type": string;
  "Transaction Description": string;
  Balance: string;
}

export interface AppleCardCreditRecord {
  "Transaction Date": string;
  "Clearing Date": string;
  Description: string;
  Merchant: string;
  Category: string;
  Type: string;
  "Amount (USD)": string;
  "Purchased By": string;
}

export interface AppleCardSavingsRecord {
  "Transaction Date": string;
  "Posted Date": string;
  "Activity Type": string;
  "Transaction Type": string;
  Description: string;
  "Currency Code": string;
  Amount: string;
}

export interface Summary {
  items: MonthSummary[];
}

export interface MonthSummary {
  month: Month;
  categories: { category: Category; total: number }[]; // Totals for each category
  groups: { group: Group; total: number; expected: number }[]; // Totals for each category group
  totals: { income: number; spending: number; expected: number }; // Totals for month (income, all spending, and expected take-home)
}

export interface DBResult {
  success: boolean;
  message: string;
}

export interface DBContents {
  rules: Rule[];
  transactions: Transaction[];
}
