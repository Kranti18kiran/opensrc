const { test, expect } = require('@playwright/test');

test("Basic Test 1 browser context fixture", async ({ browser }) => {

    //create context for browser
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.gmail.com");

});
test("Basic Test 1 page fixture", async ({ page }) => {

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

    const block_Title_open = await page.locator('[data-component-id="linz:block-view"]').nth(0);
    const block_Title_closed = await page.locator('[data-component-id="linz:block-view"]').nth(1);

    const closesconsult = await block_Title_open.locator('[class*="field__label"]').getByText('Closes').count();
    const closedconsult = await block_Title_closed.locator('[class*="field__label"]').getByText('Closed').count();

    console.log(closesconsult, closedconsult);

    let i = 0;
    do {
        const nodeTitle = await page.locator(".node__title").nth(i);
        const nodeTitlecontent = await nodeTitle.textContent();
        await nodeTitle.click();
        const countDown = await page.locator('[class*="date-countdown"]').textContent();
        const trim_countDown = countDown.split(/\s/).join('');
        console.log(nodeTitlecontent, trim_countDown);
        await expect(page.locator(".consultation-submission")).toBeVisible();
        await page.goBack();
        i += 1;
    } while (i < closesconsult);

    let j = i;
    do {
        const nodeTitle = await page.locator(".node__title").nth(j);
        await nodeTitle.nth(j)
        const nodeTitlecontent = await nodeTitle.textContent();
        await nodeTitle.click();
        const consultclosed = await page.locator('[class*="closed"]').textContent();
        const trim_consultclosed = consultclosed.split(/\s/).join('');
        console.log(nodeTitlecontent, trim_consultclosed);
        await expect(page.locator('[class*="closed"]')).toBeTruthy();
        await page.goBack();
        j += 1;
    } while (j < textconsltlistitem);

});
