module.exports = {
    dropdownMenu: "select.nav-search-dropdown",
    searchBox: "#twotabsearchtextbox", //getByLabel Search Amazon.in
    searchSuggestions: ".s-suggestion",
    dropDownOption: "text=iPhone 13 128GB",
    searchResultProduct:
      "//a[h2[span[contains(text(), 'Apple iPhone 13 (128GB) - (Product) RED')]]]",
  
    //search result screen
  
    productLink:
      '//a[h2[span[contains(text(), "Apple iPhone 13 (128GB) - (Product) RED")]]]',
  
    //product details screen
    appleStoreLink: "text=Visit the Apple Store",
  
    //apple store page
    appleWatchDropdown:
      "//li[contains(@class,'Navigation__hasChildren__jSUsH')]//a[span[text()='Apple Watch']]",
    appleWatchSE:
      "//li[contains(@class, 'Navigation__navItem__bakjf')]//a[span[text() = 'Apple Watch SE (GPS + Cellular)']]",
    watchImage: ".EditorialTile__innerContent__n92i8",
    quickLookButton: "button[data-testid='quick-look-button']",
    modalProductTitle: ".ProductShowcase__title__SBCBw",
  };
  