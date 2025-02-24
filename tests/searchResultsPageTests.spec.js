const { test, expect } = require("@playwright/test");
const AmazonHomePage = require("../Pages/homePage");
const SearchResultsPage = require("../Pages/searchResultsPage");
const {
  AMAZON_URL,
  CATEGORY,
  SEARCH_TERM_1,
  SEARCH_TERM_2,
  PRODUCT_VARIANT,
} = require("../utils/constants");

test("Search Results Page - Select iPhone 13 128GB", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const amazonHomePage = new AmazonHomePage(page);
  const searchResultsPage = new SearchResultsPage(page);

  // Step 1: Open Amazon.in
  await amazonHomePage.openUrl(AMAZON_URL);

  // Step 2: Select Electronics and search for "IPhone 13"
  await amazonHomePage.selectCategory(CATEGORY);
  await amazonHomePage.searchForProduct(SEARCH_TERM_1);
  await amazonHomePage.getSearchSuggestions(SEARCH_TERM_1);
  await amazonHomePage.selectSearchSuggestion(PRODUCT_VARIANT, SEARCH_TERM_2);
  // Step 3: Click on the searched product
  // Wait for the new tab to open
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    await searchResultsPage.clickProduct(PRODUCT_VARIANT),
    console.log("clicked on product"), // Click on the first search result
  ]);
  await newPage.waitForLoadState();
  console.log("New tab opened");
});
