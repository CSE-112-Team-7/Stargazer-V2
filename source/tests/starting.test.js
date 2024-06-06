describe("Starting Page Tests", () => {
  beforeAll(async () => {
    await page.goto(
      "http://localhost:4000/starting/page",
    );
  });

  it("click the Guest button to navigate from starting page to selection page", async () => {
    expect(page.title()).resolves.toMatch("Starting Page");

    const startButtons = await page.$$('.button');
    await Promise.all([
      page.waitForNavigation(),
      startButtons[2].click()
    ])
    
    expect(page.title()).resolves.toMatch("Selection Page");
  });
});