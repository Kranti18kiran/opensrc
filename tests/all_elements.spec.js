const {test, expect} =  require('@playwright/test');

test ("All Elements", async ({page})=>  {

    //directly hitting page fixture

        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        const tilepage = await page.title();
        console.log(tilepage);
        await page.waitForLoadState('networkidle');
        const radioBtn = await page.locator('[value*="radio"]');
        const radioBtncontent = await page.locator('[value*="radio2"]');
        const autocomplete = await page.locator('#autocomplete');
        const radioBtncount = await page.locator('[value*="radio"]').count();
        
        console.log(radioBtncount)

        for (let i=0; i < radioBtncount; i++){
            
                await radioBtncontent.nth(i).click();
                break;
                

            }
          await autocomplete.fill('ind');

        
       await page.pause();


});