describe("End to end test: select Health, Orion", () => {
  let ratio;
  let screenWidth;
  let screenHeight;
  let leftX;
  let rightX;
  let upY;
  let downY;

  beforeAll(async () => {
    await page.goto("http://localhost:4000/starting/page");
    ratio = await setRatio();
  });

  async function modifiedClick(x, y) {
    //First drag the screen so that x and y are within the viewport size.
    if (x <= leftX) {
      while (x <= leftX) {
        await page.mouse.move(100, 50);
        await page.mouse.down();
        await page.mouse.move(200, 50);
        await page.mouse.up();
        leftX = leftX - 100;
        rightX = rightX - 100;
      }
    } else if (x >= rightX) {
      while (x >= rightX) {
        await page.mouse.move(200, 50);
        await page.mouse.down();
        await page.mouse.move(100, 50);
        await page.mouse.up();
        leftX = leftX + 100;
        rightX = rightX + 100;
      }
    }
    if (y >= downY) {
      //if y is below the screen
      while (y >= downY) {
        await page.mouse.move(50, 200);
        await page.mouse.down();
        await page.mouse.move(50, 100);
        await page.mouse.up();
        upY = upY + 100;
        downY = downY + 100;
      }
    } else if (y <= upY) {
      //if y is above the screen
      while (y <= upY) {
        await page.mouse.move(50, 100);
        await page.mouse.down();
        await page.mouse.move(50, 200);
        await page.mouse.up();
        upY = upY - 100;
        downY = downY - 100;
      }
    }
    await page.mouse.click(x - leftX, y - upY);
  }

  async function setRatio() {
    let defaultWidth = 1920;
    let defaultHeight = 1080;
    let window = await page.viewport();
    screenWidth = window.width;
    screenHeight = window.height;
    leftX = 0;
    rightX = screenWidth;
    upY = 0;
    downY = screenHeight;
    let desiredWidth = screenWidth * 2;
    let desiredHeight = screenHeight * 2;
    return Math.max(
      Math.ceil(desiredHeight / defaultHeight),
      Math.ceil(desiredWidth / defaultWidth)
    );
  }

  async function resetXY() {
    let window = await page.viewport();
    screenWidth = window.width;
    screenHeight = window.height;
    leftX = 0;
    rightX = screenWidth;
    upY = 0;
    downY = screenHeight;
  }

  it("Navigate from starting page to selection page using guest identity", async () => {
    // check if page is starting page
    expect(page.title()).resolves.toMatch("Starting Page");

    // navigate to selection page with guest identity
    const startButtons = await page.$$(".button");
    await Promise.all([page.waitForNavigation(), startButtons[2].click()]);
    expect(page.title()).resolves.toMatch("Selection Page");
  });

  it("Click through selection categories and move on to skymap page", async () => {
    // Navigate through the selection page to get to skymap
    const categoryButtons = await page.$$("button");
    await categoryButtons[2].click();
    await categoryButtons[3].click();
    await categoryButtons[2].click();
    await categoryButtons[0].click();
    await categoryButtons[1].click(); // click the health button
    const link = await page.$("a");
    await Promise.all([page.waitForNavigation(), link.click()]);
    expect(page.title()).resolves.toMatch("Skymap Page"); //check is the link navigate to skymap page
  });

  it("Checking the default screen size", async () => {
    let window = await page.viewport();
    let screenWidth = window.width;
    let screenHeight = window.height;
    expect(screenWidth).toBe(800);
    expect(screenHeight).toBe(600);
  });

  it("Clicking stars for Orion and check the result, go to explanation page", async () => {
    await page.waitForSelector("span");
    const countTextContent = await page.evaluate(
      () => document.querySelector("span").textContent
    );
    expect(countTextContent).toBe("0");
    const starCountSpan = await page.$("span");
    await starCountSpan.evaluate((el) => (el.style.display = "none"));

    await page.waitForSelector("#hint");
    const hintP = await page.$("#hint");
    await hintP.evaluate((el) => (el.style.display = "none"));

    await modifiedClick(945 * ratio, 41 * ratio);
    await modifiedClick(1065 * ratio, 337 * ratio);
    await modifiedClick(1136 * ratio, 249 * ratio);
    await modifiedClick(1242 * ratio, 241 * ratio);
    await modifiedClick(1247 * ratio, 212 * ratio);

    const item = await page.evaluate(() => {
      // Access the localStorage item
      return localStorage.getItem("chosenConstellation");
    });
    expect(item).toBe("Orion");

    resetXY();

    const nextPageLink = await page.waitForSelector("a");
    await Promise.all([page.waitForNavigation(), nextPageLink.click()]);
    expect(page.title()).resolves.toMatch("Explanation Page");
  });

  it("Check if Health and Orion in local storage, check explanation/image, click next to go to response page", async () => {
    // Check local storage
    const questiontype = await page.evaluate(() => {
      return localStorage.getItem("questionType");
    });
    expect(questiontype).toBe("HEALTH");

    // get chosen constellation from local storage
    const chosenConstellation = await page.evaluate(() => {
      return localStorage.getItem("chosenConstellation");
    });
    // check chosen constellation is Canis Major
    expect(chosenConstellation).toBe("Orion");

    // check that title is Canis Major
    await page.waitForSelector("h1");
    const textContent = await page.evaluate(
      () => document.querySelector("h1").textContent
    );
    expect(textContent).toBe("Orion");

    //click continue to go to next page
    const continueButton = await page.$("#continue-button");
    await Promise.all([page.waitForNavigation(), continueButton.click()]);
    expect(page.title()).resolves.toMatch("Response Page");
  });

  it("Click see result, click to next page", async () => {
    // click see result button
    const seeResultButton = await page.$("#visibleButton");
    await seeResultButton.click();

    // click to go to thank you page
    const nextPageButton = await page.$("#hiddenButton");
    await Promise.all([page.waitForNavigation(), nextPageButton.click()]);
    expect(page.title()).resolves.toMatch("Thank You Page");
  });

  it("Click Home to go back to landing page", async () => {
    // click on home link
    const nextPageLink = await page.$("a");
    await Promise.all([page.waitForNavigation(), nextPageLink.click()]);
    await expect(page.title()).resolves.toMatch("Starting Page");
  }, 60000);
});
