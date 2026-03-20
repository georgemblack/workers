import { parse } from "papaparse";

import {
  C1CreditRecord,
  Transaction,
  Bool,
  Account,
  AppleCardCreditRecord,
  C1CheckingRecord,
  AppleCardSavingsRecord,
} from "./Types";
import {
  valid1CreditRecord,
  validAppleCardCreditRecord,
  validAppleCardSavingsRecord,
  validC1CheckingRecord,
} from "./Validate";

/**
 * Generate a unique identifier for a raw transaction by:
 * 1. Sorting the keys of the raw transaction
 * 2. Concatenating the values of the sorted keys
 * 3. Removing all whitespace
 */
function generateRecordId(record: any): string {
  let id = "";
  const keys = Object.keys(record);
  keys.sort();
  for (const key of keys) id += record[key];
  id = id.replace(/\s/g, "");
  return id;
}

/**
 * Process is the main ingestion point for CSV imports.
 * It validates the contents of the CSV, and converts it to a standardized list of transactions.
 */
export function process(
  csv: string,
  account: Account
): { transactions: Transaction[]; message: string } {
  let transactions: Transaction[] = [];
  let message = "";

  csv = csv.trim();

  // Parse Capital One credit CSV
  if (
    [Account.CAPITAL_ONE_SAVOR, Account.CAPITAL_ONE_QUICKSILVER].includes(
      account
    )
  ) {
    const result = parse<C1CreditRecord>(csv, { header: true });
    const valid = result.data.filter(valid1CreditRecord);
    message += `Discovered ${valid.length} records, ignoring ${
      result.data.length - valid.length
    }`;
    transactions = c1CreditRecordsToTransactions(valid, account);
  }

  // Parse Capital One checking CSV
  if (account === Account.CAPITAL_ONE_CHECKING) {
    const result = parse<C1CheckingRecord>(csv, { header: true });
    const valid = result.data.filter(validC1CheckingRecord);
    message += `Discovered ${valid.length} records, ignoring ${
      result.data.length - valid.length
    }`;
    transactions = c1CheckingRecordsToTransactions(valid, account);
  }

  // Parse Apple Card credit card CSV
  if (account === Account.APPLE_CARD) {
    const result = parse<AppleCardCreditRecord>(csv, { header: true });
    const valid = result.data.filter(validAppleCardCreditRecord);
    message += `Discovered ${valid.length} records, ignoring ${
      result.data.length - valid.length
    }`;
    transactions = appleCardCreditRecordsToTransactions(valid, account);
  }

  // Parse Apple Card Savings CSV
  if (account === Account.APPLE_SAVINGS) {
    const result = parse<AppleCardSavingsRecord>(csv, { header: true });
    const valid = result.data.filter(validAppleCardSavingsRecord);
    message += `Discovered ${valid.length} records, ignoring ${
      result.data.length - valid.length
    }`;
    transactions = appleCardSavingsRecordsToTransactions(valid, account);
  }

  // Normalize transactions
  const result = normalizeTransactions(transactions);
  transactions = result.transactions;
  message += `; ${result.message}`;

  return { transactions, message };
}

/**
 * Convert a record from a C1 credit account to a standard transaction.
 */
export function c1CreditRecordToTransaction(
  record: C1CreditRecord,
  account: Account
): Transaction {
  const amount =
    record.Debit !== "" ? Number(record.Debit) : Number(record.Credit);
  const credit = record.Debit !== "" ? Bool.FALSE : Bool.TRUE;

  return {
    key: generateRecordId(record),
    day: Number(record["Transaction Date"].split("-")[2]),
    month: Number(record["Transaction Date"].split("-")[1]),
    year: Number(record["Transaction Date"].split("-")[0]),
    description: record.Description,
    merchant: "",
    merchantCategory: "",
    category: "",
    amount,
    credit,
    account,
    notes: "",
    skipped: Bool.FALSE,
    reviewed: Bool.FALSE,
  };
}

export function c1CreditRecordsToTransactions(
  records: C1CreditRecord[],
  account: Account
): Transaction[] {
  return records.map((record) => c1CreditRecordToTransaction(record, account));
}

/**
 * Convert a record from a C1 checking account to a standard transaction.
 */
export function c1CheckingRecordToTransaction(
  record: C1CheckingRecord,
  account: Account
): Transaction {
  // If amount is positive, it's a credit
  const credit =
    record["Transaction Amount"].startsWith("-") === true
      ? Bool.FALSE
      : Bool.TRUE;

  // Remove negative sign from amount if it's not a credit
  const amount =
    credit === Bool.TRUE
      ? Number(record["Transaction Amount"])
      : Number(record["Transaction Amount"].substring(1));

  return {
    key: generateRecordId(record),
    day: Number(record["Transaction Date"].split("/")[1]),
    month: Number(record["Transaction Date"].split("/")[0]),
    year: Number(`20${record["Transaction Date"].split("/")[2]}`),
    description: record["Transaction Description"],
    merchant: "",
    merchantCategory: "",
    category: "",
    amount,
    credit,
    account,
    notes: "",
    skipped: Bool.FALSE,
    reviewed: Bool.FALSE,
  };
}

export function c1CheckingRecordsToTransactions(
  records: C1CheckingRecord[],
  account: Account
): Transaction[] {
  return records.map((record) =>
    c1CheckingRecordToTransaction(record, account)
  );
}

/**
 * Convert a record from an Apple Card credit account to a standard transaction.
 */
export function appleCardCreditRecordToTransaction(
  record: AppleCardCreditRecord,
  account: Account
): Transaction {
  // If amount is negative, it's a credit
  const credit =
    record["Amount (USD)"].startsWith("-") === true ? Bool.TRUE : Bool.FALSE;

  // Remove negative sign from amount if it's a credit
  const amount =
    credit === Bool.TRUE
      ? Number(record["Amount (USD)"].substring(1))
      : Number(record["Amount (USD)"]);

  return {
    key: generateRecordId(record),
    day: Number(record["Transaction Date"].split("/")[1]),
    month: Number(record["Transaction Date"].split("/")[0]),
    year: Number(record["Transaction Date"].split("/")[2]),
    description: record.Description,
    merchant: "",
    merchantCategory: "",
    category: "",
    amount,
    credit,
    account,
    notes: "",
    skipped: Bool.FALSE,
    reviewed: Bool.FALSE,
  };
}

export function appleCardCreditRecordsToTransactions(
  records: AppleCardCreditRecord[],
  account: Account
): Transaction[] {
  return records.map((record) =>
    appleCardCreditRecordToTransaction(record, account)
  );
}

/**
 * Convert a record from an Apple Card savings account to a standard transaction.
 */
export function appleCardSavingsRecordToTransaction(
  record: AppleCardSavingsRecord,
  account: Account
): Transaction {
  const credit = record["Activity Type"] === "Credit" ? Bool.TRUE : Bool.FALSE;

  return {
    key: generateRecordId(record),
    day: Number(record["Transaction Date"].split("/")[1]),
    month: Number(record["Transaction Date"].split("/")[0]),
    year: Number(record["Transaction Date"].split("/")[2]),
    amount: Number(record.Amount),
    credit,
    merchant: "",
    merchantCategory: "",
    category: "",
    account,
    description: record.Description,
    notes: "",
    skipped: Bool.FALSE,
    reviewed: Bool.FALSE,
  };
}

export function appleCardSavingsRecordsToTransactions(
  records: AppleCardSavingsRecord[],
  account: Account
): Transaction[] {
  return records.map((record) =>
    appleCardSavingsRecordToTransaction(record, account)
  );
}

/*
 * Normalize transactions.
 * If two transactions have the same key, we were charged twice. Combine to a single transaction.
 */
export function normalizeTransactions(transactions: Transaction[]): {
  transactions: Transaction[];
  message: string;
} {
  let result = transactions.slice();

  // Check for transactions with the same key
  const keys = transactions.map((transaction) => transaction.key);
  const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);

  // Merge them into a single transaction
  for (const duplicate of duplicates) {
    const duplicateTransactions = transactions.filter(
      (transaction) => transaction.key === duplicate
    );

    // Calculate merged amount
    const amount = duplicateTransactions.reduce(
      (sum, transaction) => sum + Number(transaction.amount),
      0
    );

    // Remove existing transactions from result
    result = result.filter((transaction) => transaction.key !== duplicate);

    // Add newly created transaction to result
    result.push({
      ...duplicateTransactions[0],
      amount: amount,
      notes: "Merged duplicate transactions",
    });
  }

  return {
    transactions: result,
    message: `Created ${duplicates.length} merged transactions`,
  };
}
