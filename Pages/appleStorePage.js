const BasePage = require("./basePage");
const appleStorePageObjects = require("../pageObjects/appleStorePageObjects");
const { expect } = require("@playwright/test");
const { MODAL_APPLE_PRODUCT_TITLE } = require("../utils/constants");

class AppleStorePage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = appleStorePageObjects;
  }

  async selectAppleWatchSE() {
    await this.clickElement(this.locators.appleWatchDropdown, 0);
    await this.clickElement(this.locators.appleWatchSE);
  }
  async scrollToTheWatchImage() {
    await this.page
      .locator(this.locators.watchImage)
      .nth(1)
      .scrollIntoViewIfNeeded();
  }
  async hoverOnWatchImage() {
    await this.hoverElement(this.locators.watchImage, 1);
  }

  async validateQuickLookVisibility() {
    await this.waitForSelector(this.locators.quickLookModal);
    const isVisible = await this.page.isVisible(this.locators.quickLookModal);
    expect(isVisible).toBeTruthy();
  }
  async validateQuickLookModal() {
    //click on Quick look
    await this.clickElement(this.locators.quickLookButton);

    // Step 11: Verify the newly opened modal is related to the same product
    const productTitle = newPage.locator(this.locators.modalProductTitle);
    await productTitle.waitFor({ state: "visible" });
    const isVisible = await productTitle.isVisible();
    console.log(`Product title is visible: ${isVisible}`);
    const modalProductName = await productTitle.textContent();
    if (modalProductName.includes(`${MODAL_APPLE_PRODUCT_TITLE}`)) {
      console.log("Modal is related to the same product");
    } else {
      console.error("Modal is not related to the same product");
    }
  }
}

module.exports = AppleStorePage;
