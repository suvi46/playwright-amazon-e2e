const { chromium } = require("playwright");
const { expect } = require("@playwright/test"); // Import expect for assertions

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async openUrl(url) {
    try {
      await this.page.goto(url, { waitUntil: "load" });
      console.log(`Navigated to URL: ${url}`);
      // Assert that the URL is correct
      await expect(this.page.url()).toBe(url);
    } catch (error) {
      console.error(`Failed to navigate to URL: ${url}`, error);
      throw error;
    }
  }

  async clickElement(selector, n = 0) {
    try {
      // Assert that the element is visible before clicking
      await expect(this.page.locator(selector).nth(n)).toBeVisible();
      await this.page.locator(selector).nth(n).click();
      console.log(`Clicked element with selector: ${selector}`);
    } catch (error) {
      console.error(
        `Failed to click element with selector: ${selector}`,
        error
      );
      throw error;
    }
  }

  async typeText(selector, text) {
    try {
      // Assert that the element is visible before typing
      await expect(this.page.locator(selector)).toBeVisible();
      await this.page.fill(selector, text);
      console.log(
        `Typed text "${text}" into element with selector: ${selector}`
      );
      // Assert that the text was entered correctly
      const enteredText = await this.page.inputValue(selector);
      expect(enteredText).toBe(text);
    } catch (error) {
      console.error(
        `Failed to type text "${text}" into element with selector: ${selector}`,
        error
      );
      throw error;
    }
  }

  async hoverElement(selector, n = 0) {
    try {
      // Assert that the element is visible before hovering
      await expect(this.page.locator(selector).nth(n)).toBeVisible();
      await this.page.locator(selector).nth(n).hover();
      console.log(`Hovered over element with selector: ${selector}`);
    } catch (error) {
      console.error(
        `Failed to hover over element with selector: ${selector}`,
        error
      );
      throw error;
    }
  }

  async waitForSelector(selector) {
    try {
      await this.page.waitForSelector(selector);
      console.log(`Waited for element with selector: ${selector}`);
    } catch (error) {
      console.error(
        `Failed to wait for element with selector: ${selector}`,
        error
      );
      throw error;
    }
  }

  async getText(selector) {
    try {
      const text = await this.page.locator(selector).innerText();
      console.log(
        `Retrieved text "${text}" from element with selector: ${selector}`
      );
      // Assert that the text is not empty
      expect(text).toBeTruthy();
      return text;
    } catch (error) {
      console.error(
        `Failed to retrieve text from element with selector: ${selector}`,
        error
      );
      throw error;
    }
  }

  async validateText(selector, expectedText) {
    try {
      const actualText = await this.getText(selector);
      expect(actualText).toContain(expectedText);
      console.log(
        `Validated text "${expectedText}" in element with selector: ${selector}`
      );
    } catch (error) {
      console.error(
        `Validation failed for text "${expectedText}" in element with selector: ${selector}`,
        error
      );
      throw error;
    }
  }

  async closeBrowser() {
    try {
      await this.page.close();
      console.log("Browser closed successfully");
    } catch (error) {
      console.error("Failed to close the browser", error);
      throw error;
    }
  }
}

module.exports = BasePage;
