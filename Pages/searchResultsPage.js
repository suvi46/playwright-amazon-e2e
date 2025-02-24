const BasePage = require("./basePage");
const searchResultsPageObjects = require("../pageObjects/searchResultsPageObjects");
const { expect } = require("@playwright/test");

class SearchResultsPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = searchResultsPageObjects;
  }

  async clickProduct(selector) {
    await this.clickElement(this.locators.productLink);
  }
}

module.exports = SearchResultsPage;
