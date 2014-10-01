
var MONTH_NAMES = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

/*******************************************************************
 * Month Sheet Constants
 ******************************************************************/
var BUDGET_COLUMN_CATEGORY_TITLE = 1;
var BUDGET_COLUMN_CATEGORY_SUB_TITLE = 2;
var BUDGET_COLUMN_INCOME = 3;
var BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED = 4;
var BUDGET_COLUMN_CATEGORY_SUB_ACTUAL = 5;
var BUDGET_COLUMN_CATEGORY_SUB_PENDING = 6;
var BUDGET_COLUMN_DIFF = 6;
var BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST = 7;
var BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND = 8;
var BUDGET_COLUMN_CATEGORY_SUB_BUDGET_OVERAGE = 9;
var BUDGET_COLUMN_CATEGORY_SUB_BUDGET_TOTAL_PENDING = 10;//This column should go away
var BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST_PENDING = 11;
var BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND_PENDING = 12;
var BUDGET_COLUMN_CATEGORY_TITLE_WIDTH = 100;
var BUDGET_COLUMN_CATEGORY_SUB_TITLE_WIDTH = 100;
var BUDGET_COLUMN_INCOME_WIDTH = 78;
var BUDGET_COLUMN_CATEGORY_SUB_BUDGETTED_WIDTH = 97;
var BUDGET_COLUMN_CATEGORY_SUB_ACTUAL_WIDTH = 79;
var BUDGET_COLUMN_CATEGORY_SUB_PENDING_WIDTH = 77;
var BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST_WIDTH = 80;
var BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND_WIDTH = 80;
var BUDGET_COLUMN_CATEGORY_SUB_BUDGET_OVERAGE_WIDTH = 65;
var BUDGET_COLUMN_CATEGORY_SUB_BUDGET_TOTAL_PENDING_WIDTH = 95;
var BUDGET_COLUMN_CATEGORY_SUB_BUDGET_FIRST_PENDING_WIDTH = 80;
var BUDGET_COLUMN_CATEGORY_SUB_BUDGET_SECOND_PENDING_WIDTH = 80;

var BUDGET_INCOME_COLUMN_NAME = "Income";
var BUDGET_BUDGETED_COLUMN_NAME = "Budgeted";
var BUDGET_ACTUAL_COLUMN_NAME = "Actual";
var BUDGET_DIF_COLUMN_NAME = "Dif";
var BUDGET_FIRST_COLUMN_NAME = "MID";
var BUDGET_SECOND_COLUMN_NAME = "END";
var BUDGET_OVERAGE_COLUMN_NAME = "Overage";
var BUDGET_OUTSTANDING_COLUMN_NAME = "Oustanding";
var BUDGET_FIRST_PENDING_COLUMN_NAME = "Mid";
var BUDGET_SECOND_PENDING_COLUMN_NAME = "End";

var CATEGORY_SUB_SPLITTER = " - ";

var INVERT_AMOUNT_VALUE = -1;


/*******************************************************************
 * Categories Sheet Constants
 ******************************************************************/
var CATEGORIES_SHEET_NAME = "Categories";
var CATEGORIES_SHEET_CATEGORY_COLUMN = 1;
var CATEGORIES_SHEET_SUB_CATEGORY_COLUMN = 2;
var CATEGORIES_SHEET_FULL_CATEGORY_COLUMN = 3;
var CATEGORIES_SHEET_CATEGORY_COLUMN_WIDTH = 95;
var CATEGORIES_SHEET_SUB_CATEGORY_COLUMN_WIDTH = 115;
var CATEGORIES_SHEET_FULL_CATEGORY_COLUMN_WIDTH = 190;


var CATEGORIES_SHEET_IGNORED_CATEGORY = "--Ignored--";
/*This is a hacky solution
The "Income" entry is for the income section - it just uses the first.
It's treated differently; write what you want; it's the income section.
I don't know how well it'll work with more than 2 income sub sections

The rest are CATEGORY-HEADER, "SubCategory_1", "SubCategory_2"... "SubCategory_N"

Extend/modify these to be whatever you want.
*/
var CATEGORIES_SHEET_DEFAULT_CATEGORIES = [
  ["Income", "Salary", "Other"],
  ["Saving", Tech Gear", "Emergency Fund"],
  ["Housing", "Rent", "Insurance", "House Fund"],
  ["Child Care", "Dental Work", "School Breaks"],
  ["Utilities", "Electric", "Cable", "Cell Phone"],
  ["Food", "Groceries", "Eating Out", "School Lunch"],
  ["Transportation", "Insurance", "Gas", "Maintenance", "Tabs", "Bike"],
  ["Medical/Health", "Non-Billed"],
  ["Personal", "Personal Care", "Work Misc", "Dating"],
  ["Recreation", "Dance", "Gym"],
  ["Entertainment", "Netflix", "Socializing"],
  ["MISC", "MISC", "Subscriptions"],
  ["Debts", "Credit Card", "Student Loan", "Other CC"]
];
  
/*******************************************************************
 * Ledger Sheet Constants
 ******************************************************************/
var LEDGER_COLUMN_CATEGORY = 1;
var LEDGER_COLUMN_PASTE_START = 2;
var LEDGER_COLUMN_AMOUNT = 8;
var LEDGER_COLUMN_EXTDESC = 5;

var LEDGER_SHEET_NAME = "Ledger";
var LEDGER_COLUMNS = [
  {"name":"Category","width":210,"hide":false,"moneyformat":false},
  /*
    These are the columns from the CSV of my bank, in the same order.
  */
  {"name":"Transaction_Date","width":130,"hide":false,"moneyformat":false},
  {"name":"Transaction_ID","width":100,"hide":false,"moneyformat":false},
  {"name":"TransDesc","width":110,"hide":true,"moneyformat":false},
  {"name":"ExtDesc","width":490,"hide":true,"moneyformat":false},
  {"name":"Description","width":600,"hide":false,"moneyformat":false},
  {"name":"Fee","width":30,"hide":true,"moneyformat":true},
  {"name":"Amount","width":70,"hide":false,"moneyformat":true},
  {"name":"Other_Charges","width":100,"hide":true,"moneyformat":true},
  {"name":"Balance","width":70,"hide":false,"moneyformat":true},
  {"name":"Post_Date","width":70,"hide":true,"moneyformat":false},
  {"name":"Check_Number","width":105,"hide":true,"moneyformat":false}
];
var LEDGER_COLORS = ["#c9daf8", "#d9ead3"];

/*******************************************************************
 * Transaction Cateogry Tracker Sheet Constants
 ******************************************************************/
var TRANSCAT_SHEET_NAME = "TransCatTracker";
var TRANSCAT_COLUMN_LEDGER = 1;
var TRANSCAT_COLUMN_CATEGORY = 2;
var TRANSCAT_COLUMN_COUNT = 3;
var TRANSCAT_PASTE_MIN_COLUMN_COUNT = 7;
var TRAMSCAT_PASTE_RANGE_AUTO_CATEGORIZE = 4;
var TRANSCAT_COLUMN_LEDGER_NAME = "Ledger";
var TRANSCAT_COLUMN_CATEGORY_NAME = "Category";
var TRANSCAT_COLUMN_COUNT_NAME = "Count";