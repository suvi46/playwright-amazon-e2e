const BasePage = require("./basePage");
const productDetailsPageObjects = require("../pageObjects/productDetailsPageObjects");
const { expect } = require("@playwright/test"); 
class ProductDetailsPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = productDetailsPageObjects;
  }

  async clickAppleStoreLink() {
    await this.clickElement(this.locators.appleStoreLink);
  }
}

module.exports = ProductDetailsPage;
