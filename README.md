Here’s a detailed **`README.md`** file for your Playwright automation framework. This file provides instructions on how to set up, configure, and run the tests.

---

### **Playwright Automation Framework**

This is a Playwright-based automation framework designed to automate web testing scenarios. It follows the **Page Object Model (POM)** design pattern and includes separate folders for **page objects**, **pages**, and **tests**. The framework is built using **JavaScript** and supports **Chrome** browser.

---

### **Prerequisites**

Before running the tests, ensure you have the following installed:

1. **Node.js**: Download and install Node.js from [here](https://nodejs.org/).
2. **Playwright**: Install Playwright by running the following command:
   ```bash
   npm install @playwright/test
   ```

---

### **Framework Structure**

```
playwright-e2e-amazon/
├── tests/                       # Test scripts
│   └── amazonPageTests.spec.js  # Test script for Amazon and Apple Store flow
├── pages/                       # Page classes
│   ├── amazonPage.js            # All methods for Amazon and Apple Store pages
│   └── basePage.js              # Base class with common methods
├── pageObjects/                 # Locators
│   └── amazonPageObjects.js        # All selectors for the application
├── utils/                       # Utilities
│   └── constants.js             # Constants (e.g., URLs, test data)
├── playwright.config.js         # Playwright configuration
├── package.json                 # Node.js dependencies
└── README.md                    # Instructions to set up and run tests
```

---

### **Setup Instructions**

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd playwright-amazon-e2e
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run Tests**:
   Execute all tests:

   ```bash
   npx playwright test
   ```

   Run tests in headed mode (to see the browser):

   ```bash
   npx playwright test --headed
   ```

   Generate an HTML report:

   ```bash
   npx playwright test --reporter=html
   ```

   End to End flow Test execution and Generate an Allure report:

   ```bash
   npm run test:report
   ```

---

### **Test Scenarios**

The framework includes the following test scenarios:

1. **Amazon Home Page**:

   - Open Amazon.in.
   - Select "Electronics" from the dropdown menu.
   - Search for "IPhone 13" and validate dropdown suggestions.

2. **Search Results Page**:

   - Search for "IPhone 13 128 GB".
   - Select the "iPhone 13 128GB" variant from the dropdown.
   - Click on the searched product.

3. **Product Details Page**:

   - Navigate to the new tab.
   - Click on "Visit the Apple Store".

4. **Apple Store Page**:
   - Select "Apple Watch SE (GPS + Cellular)".
   - Hover on the watch image and validate the Quick Look modal.

---

### **Configuration**

The Playwright configuration file (`playwright.config.js`) includes the following settings:

- **Browser**: Chrome (Chromium).
- **Viewport**: 1280x720.
- **Headless Mode**: Enabled by default (can be disabled using `--headed`).
- **Reporting**: HTML reporter is enabled.

---

### **Reporting**

Playwright generates detailed test execution reports. After running the tests, you can view the HTML report by opening the `playwright-report` folder:

```bash
npx playwright show-report
```
Allure Reporting
The framework integrates Allure reporting to provide detailed insights into test execution---

### **Contributing**

If you'd like to contribute to this framework, follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes and push them to your fork.
4. Submit a pull request.

---

### **Contact**

For any questions or issues, please contact:

- **Name**: Suwarna
- **Email**: suwarnawandhekar46@gmail.com

---
