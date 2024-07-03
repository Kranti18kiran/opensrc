const {test, expect} =  require('@playwright/test');

test("Basic Test 1 browser context fixture", async ({browser})=>  {

//create context for browser
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.gmail.com");

});
test.only("Basic Test 1 page fixture", async ({page})=>  {

    //directly hitting page context

        await page.goto("https://www.linz.govt.nz/");
        const tilepage = await page.title();
        console.log(tilepage);
        // verifying assertion that title has this value
        await expect(page).toHaveTitle(/Land Information New Zealand/);
        await expect(page).toHaveTitle(/Home | Toitū Te Whenua/);
    
    });
