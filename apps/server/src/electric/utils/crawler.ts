import puppeteer, { Page } from 'puppeteer-core';
import { getTextContent } from '../../utils/puppeteer';
import type { Year, Month } from '../electric.interface';

export const crawlElectricBill = async (
  year: Year,
  month: Month,
): Promise<number | undefined> => {
  const ELECTRIC_BILL_URL = process.env.ELECTRIC_BILL_URL || '';

  if (!ELECTRIC_BILL_URL) throw new Error('required electric env');

  const browser = await puppeteer.launch({
    channel: 'chrome',
    args: ['--no-sandbox'],
  });

  let amount: number | undefined;

  try {
    const page = await browser.newPage();

    await page.goto(ELECTRIC_BILL_URL);
    await loginElectricBill(page);
    await waitHistoryPage(page);
    amount = await scrapeElectricBillFromHidstory(page, year, month);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }

  return amount;
};

const loginElectricBill = async (page: Page): Promise<void> => {
  const ELECTRIC_BILL_USER = process.env.ELECTRIC_BILL_USER || '';
  const ELECTRIC_BILL_PASSWORD = process.env.ELECTRIC_BILL_PASSWORD || '';

  if (!ELECTRIC_BILL_USER || !ELECTRIC_BILL_PASSWORD) {
    throw new Error('required electric env');
  }

  await page.waitForSelector('.f-login input[name="login_id"]');
  await page.type('.f-login input[name="login_id"]', ELECTRIC_BILL_USER);
  await page.waitForSelector('.f-login input[name="password"]');
  await page.type('.f-login input[name="password"]', ELECTRIC_BILL_PASSWORD);
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    page.click('.f-login button[type="submit"].f-login__btn'),
  ]);
};

const waitHistoryPage = async (page: Page): Promise<void> => {
  await page.waitForSelector('.c-table');
};

const scrapeElectricBillFromHidstory = async (
  page: Page,
  year: Year,
  month: Month,
): Promise<number | undefined> => {
  await page.waitForSelector('.c-table');

  const $trList = await page.$$('.c-table tbody tr');

  for (const $tr of $trList) {
    const $td = await $tr.$$('td');

    if (!$td[2]) continue;

    const usedDate = await getTextContent<HTMLTableCellElement>($td[2]);

    if (usedDate !== `${year}年${month}月`) continue;
    if (!$td[4]) continue;

    const amountString = await getTextContent<HTMLTableCellElement>($td[4]);
    const amount = Number(amountString.replace(/[円,]/g, ''));

    if (isNaN(amount)) return undefined;

    return amount;
  }

  return undefined;
};
