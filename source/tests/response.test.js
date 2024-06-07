describe("Response page tests", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:4000/response/page");
  });

  it("should hide the triggering button and unhide next button", async () => {
    await page.evaluate(() => {
      localStorage.setItem("questionType", "health");
      localStorage.setItem("chosenConstellation", "Aries");
    });
    await page.evaluate(() => {
      toggleText();
    });

    // Assert that the visibleButton style display is 'none'
    const visibleButtonStyle = await page.evaluate(() => {
      const visibleButton = document.getElementById("visibleButton");
      return window.getComputedStyle(visibleButton).getPropertyValue("display");
    });
    expect(visibleButtonStyle).toBe("none");

    // Assert that the next page button is visible
    const nextPageButtonClass = await page.$eval("#hiddenButton", (el) =>
      el.classList.contains("hidden")
    );
    expect(nextPageButtonClass).toBe(false);

    // Check navigation to the thank you page
    const nextPageButton = await page.$("#hiddenButton");
    await Promise.all([page.waitForNavigation(), nextPageButton.click()]);
    expect(page.title()).resolves.toMatch("Thank You Page");
  });
});
