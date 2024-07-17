const {test,expect} = require('@playwright/test');


test ("airlines test", async ({page})=>{

await page.goto('https://www.qantas.com/au/en.html');

const destplace = "sydney";
const arrivalplace = "Hyderabad";
const fromdep = await page.locator('[class*=departure-port__container]');
const toarrive = await page.locator('[class*=arrival-port__container]');
const lookupvalue = await page.locator('[data-testid="InlineDialog-Dialog"] input');
const selectdates = await page.locator('[data-testid="travel-dates"]');
const datepicker = await page.locator('[data-testid="dialog-day-picker"]');
const dropdownlist = await page.locator('[data-testid="InlineDialog-Dialog"] [role="listbox"]');
const dropdownlistitem = await page.locator('[data-testid="InlineDialog-Dialog"] [role="listbox"] li');
const triptype = await page.locator('[data-testid="trip-type"]');
const travelclass = await page.locator('[data-testid="travel-class"]');
const travelpassangers = await page.locator('[data-testid="passengers"]');
const departwhen = await page.locator('[data-testid="startSelected"]');
const endwhen = await page.locator('[data-testid="endSelected"]');
const weekdayslabel = await page.locator('[class*="WeekdayLabels"]');


//departure selection
await fromdep.click();
await lookupvalue.waitFor();
await lookupvalue.pressSequentially(destplace);
await dropdownlist.waitFor();
const dropdowncount = await dropdownlistitem.count();
console.log(dropdowncount);
for (let i=0; i<dropdowncount; i++){

    const city = await dropdownlistitem.nth(i).textContent();
    console.log(city);
    if(city.includes('Sydney, Australia' )){

        await dropdownlistitem.nth(i).click();
        break;
    }
    
}
//arrival selection
await toarrive.click();
await lookupvalue.waitFor();

await lookupvalue.pressSequentially(arrivalplace);

for (let i=0; i<dropdowncount; i++){

    const city = await dropdownlistitem.nth(i).textContent();
    console.log(city);
    if(city.includes('Hyderabad, India' )){

        await dropdownlistitem.nth(i).click();
        break;
    }
    
}
//verify other details

    await expect(triptype.getByText('Return')).toBeVisible();
    await expect(travelclass.getByText('Economy')).toBeVisible();
    await expect(travelpassangers.getByText('Select Passengers1 Adult')).toBeVisible();
    console.log(await triptype.textContent(), await travelclass.textContent(), 
                await travelpassangers.textContent());

//select dates & date picker
    await selectdates.click();
    await datepicker.waitFor();
    await expect(departwhen.getByText('Depart when?')).toBeVisible();
    await expect(endwhen.getByText('Return when?')).toBeVisible();
    console.log(await weekdayslabel.count(), 
                await weekdayslabel.nth(0).textContent());
    




await page.pause();
});

