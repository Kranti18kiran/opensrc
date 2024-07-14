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
        const consultationcontent = await page.locator('[id="content"]');
        const consultlistitems = await page.locator('[class="view__content"] li');
        console.log(tilepage);
        // verifying assertion that partial title has this value
        await expect(page).toHaveTitle(/Land Information New Zealand/);
        await expect(page).toHaveTitle(/Home | Toitū Te Whenua/);
        await page.locator('#block-linz-website-auxiliarymenu').getByRole('link', { name: 'Consultations' }).click();
        consultationcontent.isVisible();
        const content = await consultationcontent.textContent();
        //removing spaces from the content grabbed text
        const trimspaces_content = content.split(/\s/).join('');
        console.log(trimspaces_content);
        const textconsltlistitem = await consultlistitems.count();
        console.log(textconsltlistitem);
        const closesconsult = await page.locator('[class="field__label"]').getByText('Closes');
        const closescount = await closesconsult.count();
        const closedconsult = await page.locator('[class*="field__label"]').getByText('Closed');
        const closedcount = await closedconsult.count();


        console.log(closescount, closedcount);

        for(let i=0; i < closescount; i++){

             const nodeTitle = await page.locator(".node__title").nth(i);
             const nodeTitlecontent = await nodeTitle.textContent();
            console.log(nodeTitlecontent);
             await nodeTitle.click();
             await expect(page.locator(".consultation-submission")).toBeVisible();
             await page.goBack();

        }


    
    });
