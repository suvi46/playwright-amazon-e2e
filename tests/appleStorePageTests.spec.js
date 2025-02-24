const { test, expect } = require("@playwright/test");
const AmazonHomePage = require("../Pages/homePage");
const SearchResultsPage = require("../Pages/searchResultsPage");
const ProductDetailsPage = require("../Pages/productDetailsPage");
const AppleStorePage = require("../Pages/appleStorePage");
const {
  AMAZON_URL,
  CATEGORY,
  SEARCH_TERM_1,
  SEARCH_TERM_2,
  PRODUCT_VARIANT,
  PRODUCT_NAME,
  APPLE_WATCH_VARIANT,
  _URL,
} = require("../utils/constants");

test("Apple Store Page - Select Apple Watch SE and Validate Quick Look", async ({
  browser,
}) => {
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
  // Step 4: Click on "Visit the Apple Store"
  const productDetailsPage = new ProductDetailsPage(newPage);
  await productDetailsPage.clickAppleStoreLink();

  // Step 5: Select Apple Watch SE (GPS + Cellular)
  const appleStorePage = new AppleStorePage(newPage);
  await appleStorePage.selectAppleWatchSE();
  await newPage.waitForLoadState("domcontentloaded");

  // Step 6: Hover on watch image and validate Quick Look
  await appleStorePage.scrollToTheWatchImage();
  await appleStorePage.hoverOnWatchImage();
  await appleStorePage.validateQuickLookVisibility();
  await appleStorePage.validateQuickLookModal();
});
