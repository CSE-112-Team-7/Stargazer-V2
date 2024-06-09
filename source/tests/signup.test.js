describe("Signup Page Tests", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:4000/"); // start at root page
  });

  it("Check that it navigated to signup page, try to signup existing user", async () => {
    expect(page.title()).resolves.toMatch("Starting Page");

    // click signup button -> go to signup page
    const startButtons = await page.$$(".button");
    await Promise.all([page.waitForNavigation(), startButtons[1].click()]);
    expect(page.title()).resolves.toMatch("Signup Page");

    // check that existing user (testUser1, testPassOne) fails to signup
    await page.$eval("#new_username", (el) => (el.value = "testUser1"));
    await page.$eval("#new_password", (el) => (el.value = "testPassOne"));
    await page.$eval("#new_password_conf", (el) => (el.value = "testPassOne"));

    // click signup button
    const signupButton = await page.$("#submitButton");
    await signupButton.click();

    // check that taken username error message shows up
    await page.waitForSelector("#takenUsername", {
      visible: true,
    });

    // check that it's still on signup page
    expect(page.title()).resolves.toMatch("Signup Page");
  });
});
