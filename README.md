GoogleSpreadSheetBudget
=======================

Scripts for Automated Google Spreadsheet Budgeting


TO USE: I really don't know how to set it up. Once you have a Script Editor associated with a spreadsheet; and have all these files copied in (you could do it as a single giant one... have fun...); go back and re-load the spreadsheet. This will set up the menu.

Before continuing; if there's any edits you want to make to the categories; or ledger structure; now's the time - No worries it's easy to reset up once you see how things are generated.


There is now a "Budget" menu on the spreadsheet.

    Budeget>Run Once>Init Categories
A sheet to store the categories which will be used for filtering on the ledger

    Budget>Run Once>Init Ledger
A ledger sheet is now created.

    Budget>Run Once>Init Month
A sheet for the current month is now created - OOooooo; AHhhhhhhh....

Next go to the Month sheet and enter 2 into A1 and 200 into B2; these are the lower and upper bounds for this month on the Ledger sheet (it's how the single ledger can affect multiple months)

Copy and paste entries into the Ledger sheet (Probably copy and Paste Special>Values Only).
Select the category, go back to Month; see the category entry updated. (Doesn't work with --Ignored-- or Income-*)

Repeat until the next month. Update the upper Row limit so the months don't step on each other.

Instead of creating a month fresh and having to reset up all the budgetted amounts; Go to the current month

    Budget>Create Month From Active
This will create a blank month with the same values as the previous month; but values cleared.

The TransCatTracker sheet is to auto-populate category for items when they are pasted in. It tracks the first thing it was set to; and will be a helper and auto populate next time it's pasted in. Deleting items from here does nothing except prevent auto-populating.


That's pretty much it... I'm probably missing stuff; and it can probably be improved in a lot of places, ways and code... But hey - Works for me.