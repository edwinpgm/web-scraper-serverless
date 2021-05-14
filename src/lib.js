const processor = async (page, site) => {
  await page.goto(site.url);
  await page.waitForTimeout(5000);
  await page.waitForSelector(site.waitSelector, {
    timeout: 60000,
  });

  const container = await page.$(site.container);

  const results = await page.evaluate(
    (site, container) => {
      const elementsMap = container.querySelectorAll(site.elements);
      const items = elementsMap;

      return {
        buy: items[site.buyPosition].textContent,
        sell: items[site.sellPosition].textContent,
        avg: site.avgPosition ? items[site.avgPosition].textContent : undefined,
      };
    },
    site,
    container,
  );

  return {
    source: site.source,
    buy: parseFloat(results.buy.replace(',', '.')),
    sell: parseFloat(results.sell.replace(',', '.')),
    average: results.avg
      ? parseFloat(results.avg.replace(',', '.'))
      : undefined,
  };
};

module.exports = { processor };
