const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); 
app.set('view engine', 'ejs'); 

app.set('views', path.join(__dirname, 'templates')); 

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/search', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).send('Query parameter "q" is required');
  }

  try {
    const titles = await performGoogleSearch(query);
    res.json({ success: true, titles }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while searching');
  }
});

async function performGoogleSearch(query) {
  const browser = await puppeteer.launch({
    headless: true, 
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-infobars', '--disable-browser-side-navigation'],
  });

  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  try {
    console.log('Navigating to Google...');
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`, { waitUntil: 'domcontentloaded' });

    await page.waitForSelector('h3');  

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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
