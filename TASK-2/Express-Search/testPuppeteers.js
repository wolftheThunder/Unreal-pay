const puppeteer = require('puppeteer');

async function testSearch(query) {
  const browser = await puppeteer.launch({
    headless: true, // headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  try {
    console.log('Navigating to Google...');
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`, { waitUntil: 'domcontentloaded' });

    // Wait for search results
    await page.waitForSelector('h3');  // Wait for the <h3> elements containing the titles

    const titles = await page.evaluate(() => {
      const titleElements = Array.from(document.querySelectorAll('h3'));
      return titleElements.slice(0, 10).map(title => title.textContent);
    });

    console.log('Titles:', titles);
    await browser.close();
    return titles;

  } catch (error) {
    console.error('Error during Puppeteer execution:', error);
    await browser.close();
    throw new Error('Failed to fetch search results');
  }
}

testSearch('cars').catch(console.error);
