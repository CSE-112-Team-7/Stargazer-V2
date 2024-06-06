describe("Selection Page Tests", () => {
  beforeAll(async () => {
    await page.goto(
      "http://localhost:4000/selection/page",
    );
  });

  it("click through selection categories and move on to skymap page", async () => {
    expect(page.title()).resolves.toMatch("Selection Page");
    const categoryButtons = await page.$$("button");
    let questiontype = null;
    let imgSrc = "";

    await categoryButtons[0].click(); //click the relationship button
    const iconDisplay = await page.$eval("img", (elem) => {
      return elem.style.display
    })
    expect(iconDisplay).toBe("block");  //check is the image displayed
    imgSrc = await page.$eval("img", (elem) => {
      return elem.src
    })
    expect(imgSrc).toBe("http://localhost:4000/assets/icons/rel/img");  //check is the correct image displayed
    const linkDisplay = await page.$eval("a", (elem) => {
      return elem.style.display
    })
    expect(linkDisplay).toBe("block");  //check is next button is displayed
    questiontype = await page.evaluate(() => {
      return localStorage.getItem("questionType");
    });
    expect(questiontype).toBe("RELATIONSHIP");  //check is the local storage correct


    await categoryButtons[1].click(); //click health button
    imgSrc = await page.$eval("img", (elem) => {
      return elem.src
    })
    expect(imgSrc).toBe("http://localhost:4000/assets/icons/health/img");  //check is the correct image displayed
    questiontype = await page.evaluate(() => {
      return localStorage.getItem("questionType");
    });
    expect(questiontype).toBe("HEALTH");  //check is the local storage correctly updated


    await categoryButtons[2].click(); //click the career button
    imgSrc = await page.$eval("img", (elem) => {
      return elem.src
    })
    expect(imgSrc).toBe("http://localhost:4000/assets/icons/career/img");  //check is the correct image displayed
    questiontype = await page.evaluate(() => {
      return localStorage.getItem("questionType");
    });
    expect(questiontype).toBe("CAREER");  //check is the local storage correctly updated


    await categoryButtons[3].click(); //click the horoscope button
    imgSrc = await page.$eval("img", (elem) => {
      return elem.src
    })
    expect(imgSrc).toBe("http://localhost:4000/assets/icons/daily_scope/img");  //check is the correct image displayed
    questiontype = await page.evaluate(() => {
      return localStorage.getItem("questionType");
    });
    expect(questiontype).toBe("HOROSCOPE");   //check is the local storage correctly updated

    
    await categoryButtons[1].click(); //click the health button
    const link = await page.$("a");
    await Promise.all([
      page.waitForNavigation(),
      link.click()
    ])
    expect(page.title()).resolves.toMatch("Skymap Page"); //check is the link navigate to skymap page
    questiontype = await page.evaluate(() => {
      return localStorage.getItem("questionType");
    });
    expect(questiontype).toBe("HEALTH");  //check local storage carried on to skymap page
  });
});
