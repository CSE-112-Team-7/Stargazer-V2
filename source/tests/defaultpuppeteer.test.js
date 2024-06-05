describe("Google Sanity Check Test Case", () => {
  beforeAll(async () => {
    await page.goto("https://google.com");
  });

  it('should be titled "Google"', async () => {
    await expect(page.title()).resolves.toMatch("Google");
  });
});

describe("Website Load Check", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:4000/starting/page");
  });

  it("should be titled Starting Page", async () => {
    await expect(page.title()).resolves.toMatch("Starting Page");
  });
});
