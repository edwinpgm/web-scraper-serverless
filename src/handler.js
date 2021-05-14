'use strict';

const chromium = require('chrome-aws-lambda');
const { addExtra } = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { save } = require('./storage');
const { processor } = require('./lib');

const puppeteer = addExtra(chromium.puppeteer);
puppeteer.use(StealthPlugin);
const sites = JSON.parse(process.env.SITES);

const scraper = async () => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });

  await Promise.all(
    sites.map(async (site) => {
      const page = await browser.newPage();
      const data = await processor(page, site);
      await save(data);

      return site;
    }),
  );

  await browser.close();
};

module.exports = { scraper };
