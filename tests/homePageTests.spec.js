const { test, expect } = require("@playwright/test");
const AmazonHomePage = require("../Pages/homePage");
const {
  AMAZON_URL,
  CATEGORY,
  SEARCH_TERM_1,
  SEARCH_TERM_2,
  PRODUCT_VARIANT,
} = require("../utils/constants");

test("Amazon Home Page - Search for iPhone 13", async ({ page }) => {
  const amazonHomePage = new AmazonHomePage(page);

  // Step 1: Open Amazon.in
  await amazonHomePage.openUrl(AMAZON_URL);

  // Step 2: Select Electronics and search for "IPhone 13"
  await amazonHomePage.selectCategory(CATEGORY);
  await amazonHomePage.searchForProduct(SEARCH_TERM_1);
  await amazonHomePage.getSearchSuggestions(SEARCH_TERM_1);
  await amazonHomePage.selectSearchSuggestion(PRODUCT_VARIANT, SEARCH_TERM_2);

});
