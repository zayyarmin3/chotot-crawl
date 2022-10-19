const { Builder, By, Key, until } = require("selenium-webdriver");

async function clickTheLayers(driver) {
  const layersElement = driver.findElement(By.id("layers"));
  const layersElementReact = await layersElement.getRect();
  if (layersElementReact.width != 0 && layersElementReact.height != 0) {
    await layersElement.click();
  }
}

async function hasNotFoundElement(driver) {
  try {
    await driver.findElement(
      // gonna throw exception if no notFoundElement. just the way I want it.
      By.css("div.NotFound_notFoundWrapper__1Erzd")
    );
    return true;
  } catch (e) {
    return false;
  }
}

exports.getDetailLinks = async (url) => {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(url);
    await clickTheLayers(driver);
    const hasNotFound = await hasNotFoundElement(driver);
    if (hasNotFound) {
      return [];
    }
    const items = await driver.findElements(
      By.css(".ListAds_ListAds__1z6Pv a.AdItem_adItem__2O28x")
    );
    return await Promise.all(
      items.map(async (cat) => await cat.getAttribute("href"))
    );
  } catch (e) {
    console.error(e);
    return [];
  } finally {
    await driver.quit();
  }
};

exports.getCategoryPageLinks = async (url) => {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(url);
    await clickTheLayers(driver);
    const categoryElements = await driver.findElements(
      By.css(".Categories__Item-sc-1ofwff3-2 a")
    );
    return await Promise.all(
      categoryElements.map(async (cat) => await cat.getAttribute("href"))
    );
  } catch (e) {
    console.error(e);
    return [];
  } finally {
    await driver.quit();
  }
};

exports.getPhoneAndName = async (link) => {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(link);
    await clickTheLayers(driver);
    const name = await driver
      .findElement(By.className("SellerProfile_nameDiv__dd88e"))
      .getText();
    const phoneButton = driver.findElement(
      By.className("LeadButton_showPhoneButton__1KVb-")
    );
    driver.executeScript("arguments[0].scrollIntoView(true);", phoneButton);
    await phoneButton.click();
    const phone = await phoneButton.getText();
    return { name, phone, link };
  } catch (e) {
    console.error(e);
    await driver.close();
    return null;
  } finally {
    await driver.quit();
  }
};
