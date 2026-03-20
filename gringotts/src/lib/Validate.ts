import {
  Account,
  AppleCardCreditRecord,
  AppleCardSavingsRecord,
  Bool,
  C1CheckingRecord,
  C1CreditRecord,
  Category,
  Rule,
  Tag,
  Transaction,
} from "./Types";

export function validRule(rule: Rule): boolean {
  return (
    validStr(rule.merchant) &&
    rule.merchant !== "" &&
    validStr(rule.merchantCategory) &&
    rule.merchantCategory !== "" &&
    validStr(rule.category) &&
    rule.category !== "" &&
    Object.values(Category).includes(rule.category as Category)
  );
}

export function validTransaction(transaction: Transaction): boolean {
  return (
    validStr(transaction.key) &&
    transaction.key !== "" &&
    validDay(transaction.day) &&
    validMonth(transaction.month) &&
    validYear(transaction.year) &&
    validNum(transaction.amount) &&
    validBool(transaction.credit) &&
    validStr(transaction.merchant) &&
    validStr(transaction.merchantCategory) &&
    validAccount(transaction.account) &&
    validStr(transaction.description) &&
    validStr(transaction.notes) &&
    validTags(transaction.tags) &&
    validBool(transaction.skipped) &&
    validBool(transaction.reviewed)
  );
}

export function valid1CreditRecord(record: C1CreditRecord): boolean {
  const cardNoRegex = /^\d{4}$/; // 4 digits
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD

  return (
    validStr(record["Transaction Date"]) &&
    dateRegex.test(record["Transaction Date"]) &&
    validStr(record["Posted Date"]) &&
    dateRegex.test(record["Posted Date"]) &&
    validStr(record["Card No."]) &&
    cardNoRegex.test(record["Card No."]) &&
    validStr(record.Description) &&
    record.Description !== "" &&
    validStr(record.Category) &&
    record.Category !== "" &&
    (validNumStr(record.Credit) || validNumStr(record.Debit)) &&
    (record.Credit !== "" || record.Debit !== "") &&
    (validNumStr(record.Credit) || validNumStr(record.Debit))
  );
}

export function validC1CheckingRecord(record: C1CheckingRecord): boolean {
  const accountNoRegex = /^\d{4}$/; // 4 digits
  const dateRegex = /^\d{2}\/\d{2}\/\d{2}$/; // MM/DD/YY

  return (
    validStr(record["Account Number"]) &&
    accountNoRegex.test(record["Account Number"]) &&
    validStr(record["Transaction Date"]) &&
    dateRegex.test(record["Transaction Date"]) &&
    validStr(record["Transaction Amount"]) &&
    record["Transaction Amount"] !== "" &&
    validStr(record["Transaction Type"]) &&
    (record["Transaction Type"] === "Debit" ||
      record["Transaction Type"] === "Credit") &&
    validStr(record["Transaction Description"]) &&
    record["Transaction Description"] !== "" &&
    validStr(record.Balance)
  );
}

export function validAppleCardCreditRecord(
  record: AppleCardCreditRecord
): boolean {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; // MM/DD/YYYY

  return (
    validStr(record["Transaction Date"]) &&
    dateRegex.test(record["Transaction Date"]) &&
    validStr(record["Clearing Date"]) &&
    dateRegex.test(record["Clearing Date"]) &&
    validStr(record.Description) &&
    record.Description !== "" &&
    validStr(record.Merchant) &&
    record.Merchant !== "" &&
    validStr(record.Category) &&
    record.Category !== "" &&
    validStr(record.Type) &&
    record.Type !== "" &&
    validNumStr(record["Amount (USD)"]) &&
    record["Amount (USD)"] !== "" &&
    validStr(record["Purchased By"]) &&
    record["Purchased By"] !== ""
  );
}

export function validAppleCardSavingsRecord(
  record: AppleCardSavingsRecord
): boolean {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; // MM/DD/YYYY

  return (
    validStr(record["Transaction Date"]) &&
    dateRegex.test(record["Transaction Date"]) &&
    validStr(record["Posted Date"]) &&
    dateRegex.test(record["Posted Date"]) &&
    validStr(record["Activity Type"]) &&
    record["Activity Type"] !== "" &&
    validStr(record["Transaction Type"]) &&
    record["Transaction Type"] !== "" &&
    validStr(record.Description) &&
    record.Description !== "" &&
    validStr(record["Currency Code"]) &&
    record["Currency Code"] !== "" &&
    validNumStr(record.Amount) &&
    record.Amount !== ""
  );
}

function validStr(field: string): boolean {
  return field !== undefined && field !== null && typeof field === "string";
}

function validNum(field: number): boolean {
  return (
    field !== undefined &&
    field !== null &&
    typeof field === "number" &&
    !isNaN(field)
  );
}

function validNumStr(field: string): boolean {
  return validStr(field) && !isNaN(Number(field));
}

function validBool(field: Bool): boolean {
  return validNum(field) && (field === Bool.TRUE || field === Bool.FALSE);
}

function validDay(day: number): boolean {
  return validNum(day) && Number.isInteger(day) && day >= 1 && day <= 31;
}

function validMonth(month: number): boolean {
  return (
    validNum(month) && Number.isInteger(month) && month >= 1 && month <= 12
  );
}

function validYear(year: number): boolean {
  return (
    validNum(year) && Number.isInteger(year) && year >= 2022 && year <= 2026
  );
}

function validAccount(account: string): boolean {
  return Object.values(Account).includes(account as Account);
}

function validTags(tags: string[] | undefined): boolean {
  if (tags === undefined) return true;
  if (!Array.isArray(tags)) return false;
  return tags.every((tag) => validTag(tag));
}

function validTag(tag: string): boolean {
  return Object.values(Tag).includes(tag as Tag);
}
