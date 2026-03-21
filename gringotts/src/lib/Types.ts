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
  AUTO_PAYMENT = "AUTO_PAYMENT",
  GROCERIES = "GROCERIES",
  MORTGAGE_PAYMENT = "MORTGAGE_PAYMENT",
  SUPPLIES = "SUPPLIES",
  TRANSPORTATION = "TRANSPORTATION",
  UTILITIES = "UTILITIES",
  ESSENTIAL_SERVICES = "ESSENTIAL_SERVICES",
  EDUCATION = "EDUCATION",
  HEALTH = "HEALTH",
  INSURANCE = "INSURANCE",
  DINING_ENTERTAINMENT = "DINING_ENTERTAINMENT",
  YEARLY_SUBSCRIPTIONS = "YEARLY_SUBSCRIPTIONS",
  MONTHLY_SUBSCRIPTIONS = "MONTHLY_SUBSCRIPTIONS",
  CHARITY = "CHARITY",
  SHOPPING = "SHOPPING",
  ELECTIVE_SERVICES = "ELECTIVE_SERVICES",
  TRIPS_AND_TRAVEL = "TRIPS_AND_TRAVEL",
  GIFTS = "GIFTS",
  OTHER = "OTHER",
  EXTRA_MORTGAGE = "EXTRA_MORTGAGE",
  ROTH_IRA = "ROTH_IRA",
  KIDS_FUND = "KIDS_FUND",
}

export const CategoryNames = {
  [Category.COMPENSATION]: "Compensation",
  [Category.BANKING_REWARDS]: "Banking Rewards",
  [Category.INCOME_MISC]: "Income Misc",
  [Category.AUTO_PAYMENT]: "Auto Payment",
  [Category.GROCERIES]: "Groceries",
  [Category.MORTGAGE_PAYMENT]: "Mortgage Payment",
  [Category.SUPPLIES]: "Supplies",
  [Category.TRANSPORTATION]: "Transportation",
  [Category.UTILITIES]: "Utilities",
  [Category.ESSENTIAL_SERVICES]: "Essential Services",
  [Category.EDUCATION]: "Education",
  [Category.HEALTH]: "Health",
  [Category.INSURANCE]: "Insurance",
  [Category.DINING_ENTERTAINMENT]: "Dining & Entertainment",
  [Category.YEARLY_SUBSCRIPTIONS]: "Yearly Subscriptions",
  [Category.MONTHLY_SUBSCRIPTIONS]: "Monthly Subscriptions",
  [Category.CHARITY]: "Charity",
  [Category.SHOPPING]: "Shopping",
  [Category.ELECTIVE_SERVICES]: "Elective Services",
  [Category.TRIPS_AND_TRAVEL]: "Trips and Travel",
  [Category.GIFTS]: "Gifts",
  [Category.OTHER]: "Other",
  [Category.EXTRA_MORTGAGE]: "Extra Mortgage",
  [Category.ROTH_IRA]: "Roth IRA",
  [Category.KIDS_FUND]: "Kids Fund",
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
  [Category.AUTO_PAYMENT]: Group.ESSENTIAL,
  [Category.GROCERIES]: Group.ESSENTIAL,
  [Category.MORTGAGE_PAYMENT]: Group.ESSENTIAL,
  [Category.SUPPLIES]: Group.ESSENTIAL,
  [Category.TRANSPORTATION]: Group.ESSENTIAL,
  [Category.UTILITIES]: Group.ESSENTIAL,
  [Category.ESSENTIAL_SERVICES]: Group.ESSENTIAL,
  [Category.EDUCATION]: Group.ESSENTIAL,
  [Category.HEALTH]: Group.ESSENTIAL,
  [Category.INSURANCE]: Group.ESSENTIAL,
  [Category.DINING_ENTERTAINMENT]: Group.ELECTIVE,
  [Category.YEARLY_SUBSCRIPTIONS]: Group.ELECTIVE,
  [Category.MONTHLY_SUBSCRIPTIONS]: Group.ELECTIVE,
  [Category.CHARITY]: Group.ELECTIVE,
  [Category.SHOPPING]: Group.ELECTIVE,
  [Category.ELECTIVE_SERVICES]: Group.ELECTIVE,
  [Category.TRIPS_AND_TRAVEL]: Group.ELECTIVE,
  [Category.GIFTS]: Group.ELECTIVE,
  [Category.OTHER]: Group.ELECTIVE,
  [Category.EXTRA_MORTGAGE]: Group.INVESTMENT,
  [Category.ROTH_IRA]: Group.INVESTMENT,
  [Category.KIDS_FUND]: Group.INVESTMENT,
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
  ARTHUR = "ARTHUR",
}

export const TagNames = {
  [Tag.PICASSO]: "Picasso",
  [Tag.ARTHUR]: "Arthur",
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
  merchant: string | null;
  category: string | null;
  account: Account;
  description: string;
  notes: string | null;
  tags?: string[] | null;
  skipped: Bool.FALSE | Bool.TRUE;
  reviewed: Bool.FALSE | Bool.TRUE;
  merchantSuggestion: string | null;
}

export interface Rule {
  id?: number;
  merchant: string;
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
