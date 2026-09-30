//#region src/lib/Types.ts
var Bool = /* @__PURE__ */ function(Bool) {
	Bool[Bool["TRUE"] = 1] = "TRUE";
	Bool[Bool["FALSE"] = 0] = "FALSE";
	return Bool;
}({});
var Account = /* @__PURE__ */ function(Account) {
	Account["CAPITAL_ONE_SAVOR"] = "CAPITAL_ONE_SAVOR";
	Account["CAPITAL_ONE_QUICKSILVER"] = "CAPITAL_ONE_QUICKSILVER";
	Account["CAPITAL_ONE_CHECKING"] = "CAPITAL_ONE_CHECKING";
	Account["APPLE_CARD"] = "APPLE_CARD";
	Account["APPLE_SAVINGS"] = "APPLE_SAVINGS";
	return Account;
}({});
var AccountNames = {
	["CAPITAL_ONE_SAVOR"]: "Capital One Savor",
	["CAPITAL_ONE_QUICKSILVER"]: "Capital One Quicksilver",
	["CAPITAL_ONE_CHECKING"]: "Capital One Checking",
	["APPLE_CARD"]: "Apple Card",
	["APPLE_SAVINGS"]: "Apple Savings"
};
var Category = /* @__PURE__ */ function(Category) {
	Category["COMPENSATION"] = "COMPENSATION";
	Category["BANKING_REWARDS"] = "BANKING_REWARDS";
	Category["INCOME_MISC"] = "INCOME_MISC";
	Category["MORTGAGE_PAYMENT"] = "MORTGAGE_PAYMENT";
	Category["AUTO_PAYMENT"] = "AUTO_PAYMENT";
	Category["UTILITIES"] = "UTILITIES";
	Category["TRANSPORTATION"] = "TRANSPORTATION";
	Category["INSURANCE"] = "INSURANCE";
	Category["HEALTH"] = "HEALTH";
	Category["EDUCATION"] = "EDUCATION";
	Category["GROCERIES"] = "GROCERIES";
	Category["SUPPLIES"] = "SUPPLIES";
	Category["ESSENTIAL_SERVICES"] = "ESSENTIAL_SERVICES";
	Category["DINING_ENTERTAINMENT"] = "DINING_ENTERTAINMENT";
	Category["SHOPPING"] = "SHOPPING";
	Category["ELECTIVE_SERVICES"] = "ELECTIVE_SERVICES";
	Category["TRIPS_AND_TRAVEL"] = "TRIPS_AND_TRAVEL";
	Category["MONTHLY_SUBSCRIPTIONS"] = "MONTHLY_SUBSCRIPTIONS";
	Category["YEARLY_SUBSCRIPTIONS"] = "YEARLY_SUBSCRIPTIONS";
	Category["GIFTS"] = "GIFTS";
	Category["CHARITY"] = "CHARITY";
	Category["OTHER"] = "OTHER";
	Category["EXTRA_MORTGAGE"] = "EXTRA_MORTGAGE";
	Category["ROTH_IRA"] = "ROTH_IRA";
	Category["KIDS_FUND"] = "KIDS_FUND";
	return Category;
}({});
var CategoryNames = {
	["COMPENSATION"]: "Compensation",
	["BANKING_REWARDS"]: "Banking Rewards",
	["INCOME_MISC"]: "Income Misc",
	["AUTO_PAYMENT"]: "Auto Payment",
	["GROCERIES"]: "Groceries",
	["MORTGAGE_PAYMENT"]: "Mortgage Payment",
	["SUPPLIES"]: "Supplies",
	["TRANSPORTATION"]: "Transportation",
	["UTILITIES"]: "Utilities",
	["ESSENTIAL_SERVICES"]: "Essential Services",
	["EDUCATION"]: "Education",
	["HEALTH"]: "Health",
	["INSURANCE"]: "Insurance",
	["DINING_ENTERTAINMENT"]: "Dining & Entertainment",
	["YEARLY_SUBSCRIPTIONS"]: "Yearly Subscriptions",
	["MONTHLY_SUBSCRIPTIONS"]: "Monthly Subscriptions",
	["CHARITY"]: "Charity",
	["SHOPPING"]: "Shopping",
	["ELECTIVE_SERVICES"]: "Elective Services",
	["TRIPS_AND_TRAVEL"]: "Trips and Travel",
	["GIFTS"]: "Gifts",
	["OTHER"]: "Other",
	["EXTRA_MORTGAGE"]: "Extra Mortgage",
	["ROTH_IRA"]: "Roth IRA",
	["KIDS_FUND"]: "Kids Fund"
};
var Group = /* @__PURE__ */ function(Group) {
	Group["INCOME"] = "INCOME";
	Group["ESSENTIAL"] = "ESSENTIAL";
	Group["ELECTIVE"] = "ELECTIVE";
	Group["INVESTMENT"] = "INVESTMENT";
	return Group;
}({});
var Groups = {
	["COMPENSATION"]: "INCOME",
	["BANKING_REWARDS"]: "INCOME",
	["INCOME_MISC"]: "INCOME",
	["AUTO_PAYMENT"]: "ESSENTIAL",
	["GROCERIES"]: "ESSENTIAL",
	["MORTGAGE_PAYMENT"]: "ESSENTIAL",
	["SUPPLIES"]: "ESSENTIAL",
	["TRANSPORTATION"]: "ESSENTIAL",
	["UTILITIES"]: "ESSENTIAL",
	["ESSENTIAL_SERVICES"]: "ESSENTIAL",
	["EDUCATION"]: "ESSENTIAL",
	["HEALTH"]: "ESSENTIAL",
	["INSURANCE"]: "ESSENTIAL",
	["DINING_ENTERTAINMENT"]: "ELECTIVE",
	["YEARLY_SUBSCRIPTIONS"]: "ELECTIVE",
	["MONTHLY_SUBSCRIPTIONS"]: "ELECTIVE",
	["CHARITY"]: "ELECTIVE",
	["SHOPPING"]: "ELECTIVE",
	["ELECTIVE_SERVICES"]: "ELECTIVE",
	["TRIPS_AND_TRAVEL"]: "ELECTIVE",
	["GIFTS"]: "ELECTIVE",
	["OTHER"]: "ELECTIVE",
	["EXTRA_MORTGAGE"]: "INVESTMENT",
	["ROTH_IRA"]: "INVESTMENT",
	["KIDS_FUND"]: "INVESTMENT"
};
/**
* Given a category name (e.g. "Dining & Entertainment"), return the proper category (e.g. "DINING_ENTERTAINMENT").
*/
function getProperCategory(category) {
	for (const [key, value] of Object.entries(CategoryNames)) if (value === category) return key;
	return null;
}
var Tag = /* @__PURE__ */ function(Tag) {
	Tag["PICASSO"] = "PICASSO";
	Tag["ARTHUR"] = "ARTHUR";
	return Tag;
}({});
var TagNames = {
	["PICASSO"]: "Picasso",
	["ARTHUR"]: "Arthur"
};
/**
* Given a tag name (e.g. "Picasso"), return the proper tag (e.g. "PICASSO").
*/
function getProperTag(tag) {
	for (const [key, value] of Object.entries(TagNames)) if (value === tag) return key;
	return null;
}
var Month = /* @__PURE__ */ function(Month) {
	Month["JANUARY"] = "January";
	Month["FEBRUARY"] = "February";
	Month["MARCH"] = "March";
	Month["APRIL"] = "April";
	Month["MAY"] = "May";
	Month["JUNE"] = "June";
	Month["JULY"] = "July";
	Month["AUGUST"] = "August";
	Month["SEPTEMBER"] = "September";
	Month["OCTOBER"] = "October";
	Month["NOVEMBER"] = "November";
	Month["DECEMBER"] = "December";
	return Month;
}({});
function getMonthNumber(month) {
	return Object.values(Month).indexOf(month) + 1;
}
//#endregion
export { CategoryNames as a, Month as c, getMonthNumber as d, getProperCategory as f, Category as i, Tag as l, AccountNames as n, Group as o, getProperTag as p, Bool as r, Groups as s, Account as t, TagNames as u };
