const BasePage = require("./basePage");
const homePageObjects = require("../pageObjects/homePageObjects");
const { expect } = require("@playwright/test");

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = homePageObjects;
  }

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
}

module.exports = HomePage;
