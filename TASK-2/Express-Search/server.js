const express = require('express');
const cors = require('cors'); 
const puppeteer = require('puppeteer');
const app = express();
const port = 4000;


app.use(cors()); 

app.use(express.json());


app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ success: false, message: 'Query parameter "q" is required' });
  }
  try {
    const titles = await performGoogleSearch(query);
    res.json({ success: true, titles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while searching' });
  }
});


async function performGoogleSearch(query) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  try {
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('h3');
    const titles = await page.evaluate(() => {
      const titleElements = Array.from(document.querySelectorAll('h3'));
      return titleElements.slice(0, 10).map(title => title.textContent);
    });
    await browser.close();
    return titles;
  } catch (error) {
    console.error('Error during Puppeteer execution:', error);
    await browser.close();
    throw new Error('Failed to fetch search results');
  }
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
