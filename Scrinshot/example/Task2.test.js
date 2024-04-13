import fs from "node:fs/promises";
import path from "node:path";

const xpath = `//*[@id="app"]/div/div[3]/div/div/div/div/div[3]/div/div[2]`;
const url = 'https://www.avito.ru/avito-care/eco-impact';
const outputPath = `./output`;
const browsersUserAgents = {
    'Chrome': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Firefox': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0'
}
describe("Avito", () => {
    beforeAll(async () => {
        for (const file of await fs.readdir(outputPath)) {
            await fs.unlink(path.join(outputPath, file));
        }

        page.setDefaultNavigationTimeout(100000);
    });

    test.each`
         number | width    | height   | browser 
         ${1}     | ${1920} | ${1080} | ${'Firefox'} 
         ${2}     | ${1536} | ${864}  | ${'Chrome'}  
         ${3}     | ${2560} | ${1440} | ${'Firefox'} 
         ${4}     | ${800}  | ${600}  | ${'Chrome'}  
         ${5}     | ${1366} | ${768}  | ${'Firefox'} 
         ${6}     | ${1440} | ${900}  | ${'Chrome'}  
         ${7}     | ${393}  | ${873}  | ${'Firefox'} 
         ${8}     | ${1280} | ${720}  | ${'Chrome'}  
         ${9}     | ${360}  | ${800}  | ${'Firefox'} 
         ${10}    | ${390}  | ${844}  | ${'Chrome'}  
         ${11}    | ${414}  | ${896}  | ${'Firefox'} 
         ${12}    | ${412}  | ${915}  | ${'Chrome'}  
         ${13}    | ${1680} | ${1050} | ${'Firefox'} 
         ${14}    | ${1600} | ${900}  | ${'Chrome'}  
         ${15}    | ${2048} | ${1152} | ${'Firefox'} 
    `('Test #$number: use $browser with resolution $width x $height',
        async ({number: testCaseNumber, width, height, browser}) => {
            await page.setViewport({
                width: width,
                height: height,
            });
            await page.setUserAgent(browsersUserAgents[browser]);
            await page.goto(url, {
                waitUntil: 'networkidle2',
            });
            const fileElement = await page.waitForSelector(`xpath/${xpath}`);
            await fileElement.screenshot({
                path: `${outputPath}/${testCaseNumber}.png`,
            });
        }, 120000);
});