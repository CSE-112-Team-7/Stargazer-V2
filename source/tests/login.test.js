describe("Login Page Tests", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:4000/"); // start at root page
  });

  it("Verify that it navigated to login page, try invalid combos, then valid and check it went to selection page", async () => {
    expect(page.title()).resolves.toMatch("Starting Page");

    // click login button -> go to login page
    const startButtons = await page.$$(".button");
    await Promise.all([page.waitForNavigation(), startButtons[0].click()]);
    expect(page.title()).resolves.toMatch("Login Page");

    // valid username and password combination: (testUser1, testPassOne)

    const loginButton = await page.$("#submitButton");

    // try invalid username and password
    await page.$eval("#rec_username", (el) => (el.value = "notUser"));
    await page.$eval("#rec_password", (el) => (el.value = "testPassOne"));

    // click login button -> should fail login
    await loginButton.click();
    // check that error message is now visible
    await page.waitForSelector("#errorMsg", {
      visible: true,
    });
    // check that it's still on login page
    expect(page.title()).resolves.toMatch("Login Page");

    // try valid username and invalid password
    await page.$eval("#rec_username", (el) => (el.value = "testUser1"));
    await page.$eval("#rec_password", (el) => (el.value = "notTestPass"));

    // click login button -> should fail login
    await loginButton.click();
    // check that it's still on login page
    expect(page.title()).resolves.toMatch("Login Page");

    // try valid username and password
    await page.$eval("#rec_username", (el) => (el.value = "testUser1"));
    await page.$eval("#rec_password", (el) => (el.value = "testPassOne"));

    // click login button to submit, check it went to selection page
    await Promise.all([page.waitForNavigation(), loginButton.click()]);
    expect(page.title()).resolves.toMatch("Selection Page");
  });
});
