# ListAllCostVoyageApp
I wanted to create a simple web application to list all cost items related to a voyage. Focused on displaying and working with expense categories and cost Items only.
- Application built using TypeScript and have all data types created as TypeScript interfaces.
- Exchange Rate to base currency is available in costs.json file (baseCurrency.exchangeRate).
- Comments should be available to read by clicking on the comments icon. The comment icon should expand/collapse this section of comments.
- There is possible to change the main currency that is used to display costs. All available currencies with corresponding FX rates are listed in exchange-rates.json. Doing so, will recalculate the cost in DA Currency and display to the user. To do so, each individual cost item needs to be multiplied by the selected currency’s exchange rate.
- Costs rounded to two decimal points.
- Total section for each expense category displayed.
