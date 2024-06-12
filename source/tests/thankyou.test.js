describe("Thank You Page Tests", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:4000/thankyou/page");
  });

  it("Click Home to go back to landing page", async () => {
    // check if on thank you page
    const thankyouURL = await page.url();
    expect(thankyouURL).toBe("http://localhost:4000/thankyou/page");

    // click on home link
    const nextPageLink = await page.waitForSelector("a");
    await Promise.all([page.waitForNavigation(), nextPageLink.click()]);
    await expect(page.title()).resolves.toMatch(
      new RegExp("^(Starting Page|Selection Page)$")
    );
  });
});
