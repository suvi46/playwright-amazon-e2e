const { expect } = require("@playwright/test");
const BasePage = require("./basePage");
const amazonPageObjects = require("../pageObjects/amazonPageObjects");
const { MODAL_APPLE_PRODUCT_TITLE } = require("../utils/constants");
class AmazonPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = amazonPageObjects;
  }

  // Amazon Home Page Methods
  // async openUrl(url) {
  //   await this.page.goto(url);
  // }

  async selectCategory(category) {
    await this.page
      .locator(this.locators.dropdownMenu)
      .selectOption({ label: `${category}` });
  }

  async searchForProduct(searchKeyword) {
    await this.typeText(this.locators.searchBox, searchKeyword);
  }

  async getSearchSuggestions(relatedKeyword) {
    try {
      await this.waitForSelector(this.locators.searchSuggestions);
      const suggestionCount = await this.page
        .locator(this.locators.searchSuggestions)
        .count();
      // Assert that there are suggestions
      expect(suggestionCount).toBeGreaterThan(0);
      console.log(`Found ${suggestionCount} dropdown suggestions`);
      const suggestions = await this.page
        .locator(this.locators.searchSuggestions)
        .allTextContents();
      // Validate suggestions
      for (const suggestion of suggestions) {
        expect(suggestion.toLowerCase()).toContain(
          relatedKeyword.toLowerCase()
        );
      }
      console.log(`All dropdown suggestions are related to ${relatedKeyword}`);
    } catch (error) {
      console.error(
        `Some dropdown suggestions are not related to ${relatedKeyword}.`,
        error
      );
      throw error;
    }
  }

  async selectSearchSuggestion(suggestion, searchKeyword2) {
    //reenter the keyword
    await this.typeText(this.locators.searchBox, searchKeyword2);
    await this.waitForSelector(`text=${suggestion}`);
    await this.clickElement(`text=${suggestion}`);
    console.log(`Selected ${searchKeyword2} from dropdown`);
  }

  // Search Results Page Methods
  async clickProduct(selector) {
    await this.clickElement(this.locators.productLink);
  }

  // Product Details Page Methods
  async clickAppleStoreLink() {
    await this.clickElement(this.locators.appleStoreLink);
  }

  // Apple Store Page Methods
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
    await this.waitForSelector(this.locators.quickLookButton);
    const isVisible = await this.page.isVisible(this.locators.quickLookButton);
    expect(isVisible).toBeTruthy();
  }

  async validateQuickLookModal() {
    //click on Quick look
    await this.clickElement(this.locators.quickLookButton);

    // Verify the newly opened modal is related to the same product
    const productTitle = this.page.locator(this.locators.modalProductTitle);
    await productTitle.waitFor({ state: "visible" });
    const isVisible = await productTitle.isVisible();
    console.log(`Product title is visible: ${isVisible}`);
    const modalProductName = await productTitle.textContent();
    console.log(modalProductName + " :product name on popup");
    if (modalProductName.includes(`${MODAL_APPLE_PRODUCT_TITLE}`)) {
      console.log("Modal is related to the same product");
    } else {
      console.error("Modal is not related to the same product");
    }
  }
}

module.exports = AmazonPage;
