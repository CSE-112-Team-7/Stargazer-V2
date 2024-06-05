describe("Explanation Page Tests", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:4000/skymap/page");

    await page.evaluate(() => {
      localStorage.setItem("questionType", "health");
      localStorage.setItem("chosenConstellation", "Aries");
    });

    await page.goto("http://localhost:4000/explanation/page");
  });

  it("Check if Health and Aries are in local storage, ", async () => {
    // check if page is explanation page
    const pageURL = await page.url();
    expect(pageURL).toBe("http://localhost:4000/explanation/page");

    // Check local storage
    const questiontype = await page.evaluate(() => {
      return localStorage.getItem("questionType");
    });

    expect(questiontype).toBe("health");

    // get chosen constellation from local storage
    const chosenConstellation = await page.evaluate(() => {
      return localStorage.getItem("chosenConstellation");
    });
    // check chosen constellation is Canis Major
    expect(chosenConstellation).toBe("Aries");
  });

  it("Check the heading is Aries", async () => {
    // check that title is Canis Major
    await page.waitForSelector("h1");
    const textContent = await page.evaluate(
      () => document.querySelector("h1").textContent
    );

    expect(textContent).toBe("Aries");
  });

  it("Check that the image is displayed", async () => {
    // check that image is not empty
    let searchElemnt = "img_container";
    let checkForElement = await page.evaluate((sel) => {
      let elementCheck = Array.from(document.querySelectorAll(sel));
      if (elementCheck.length) {
        return true;
      } else return false;
    }, searchElemnt);
  });

  it("Click on continue button, check if went to response page", async () => {
    //click continue to go to next page
    const continueButton = await page.$("#continue-button");

    await Promise.all([page.waitForNavigation(), continueButton.click()]);
    expect(page.title()).resolves.toMatch("Response Page");
  });
});
