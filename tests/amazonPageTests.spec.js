const { test, expect } = require("@playwright/test");
const AmazonPage = require("../Pages/amazonPage");
const {
  AMAZON_URL,
  CATEGORY,
  SEARCH_TERM_1,
  SEARCH_TERM_2,
  PRODUCT_VARIANT,
} = require("../utils/constants");
test.describe("Amazon Search and Apple Store Flow", () => {

test("Apple Store Page - Select Apple Watch SE and Validate Quick Look", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const allPages = new AmazonPage(page);
  let newPage;

  // Allure: Add a description to the test
  test.info().description =
    "This test validates the flow of searching for an iPhone 13 on Amazon, navigating to the Apple Store, and verifying the Quick Look modal for Apple Watch SE.";

  try {
    // Step 1: Open Amazon.in
    await test.step("Step 1: Open Amazon.in", async () => {
      await allPages.openUrl(AMAZON_URL);
    });

    // Step 2: Select Electronics and search for "IPhone 13"
    await test.step(`Step 2: Search for "${SEARCH_TERM_1}"`, async () => {
      await allPages.selectCategory(CATEGORY);
      await allPages.searchForProduct(SEARCH_TERM_1);
      await allPages.getSearchSuggestions(SEARCH_TERM_1);
      await allPages.selectSearchSuggestion(PRODUCT_VARIANT, SEARCH_TERM_2);
    });

    // Step 3: Click on the searched product and wait for the new tab
    await test.step("Step 3: Click on the searched product", async () => {
      [newPage] = await Promise.all([
        context.waitForEvent("page"),
        allPages.clickProduct(),
      ]);
      await newPage.waitForLoadState();
      console.log("New tab opened");

      // Attach a screenshot of the new tab
      await test.info().attach("New Tab Screenshot", {
        body: await newPage.screenshot(),
        contentType: "image/png",
      });
    });

    // Step 4: Click on "Visit the Apple Store"
    await test.step("Step 4: Click on 'Visit the Apple Store'", async () => {
      const allPagesNewTab = new AmazonPage(newPage);
      await allPagesNewTab.clickAppleStoreLink();
      await allPagesNewTab.selectAppleWatchSE();
      await newPage.waitForLoadState("domcontentloaded");
    });

    // Step 6: Hover on watch image and validate Quick Look
    await test.step("Step 6: Hover on watch image and validate Quick Look", async () => {
      const allPagesNewTab = new AmazonPage(newPage);
      await allPagesNewTab.scrollToTheWatchImage();
      await allPagesNewTab.hoverOnWatchImage();
      await allPagesNewTab.validateQuickLookVisibility();
      await allPagesNewTab.validateQuickLookModal();

      // Attach a screenshot of the Quick Look modal
      await test.info().attach("Quick Look Modal Screenshot", {
        body: await newPage.screenshot(),
        contentType: "image/png",
      });
    });
  } catch (error) {
    // Attach the error message to the Allure report
    await test.info().attach("Test Failed", {
      body: `Test failed: ${error.message}`,
      contentType: "text/plain",
    });

    // Attach a screenshot of the page at the time of failure
    await test.info().attach("Failure Screenshot", {
      body: await page.screenshot(),
      contentType: "image/png",
    });

    throw error; // Re-throw the error to fail the test
  } finally {
    await context.close(); // Close the browser session
    console.log("Browser session closed.");
  }
});
});