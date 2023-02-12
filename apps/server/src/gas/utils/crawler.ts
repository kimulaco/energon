import puppeteer, { Page } from 'puppeteer-core';
import { getTextContent } from '../../utils/puppeteer';
import { delay } from '../../utils/delay';
import type { Year, Month } from '../gas.interface';

export const crawlGasBill = async (
  year: Year,
  month: Month,
): Promise<number | undefined> => {
  const GAS_BILL_URL = process.env.GAS_BILL_URL || '';

  if (!GAS_BILL_URL) throw new Error('required gas env');

  const browser = await puppeteer.launch({
    channel: 'chrome',
    args: ['--no-sandbox'],
  });

  let amount: number | undefined;

  try {
    const page = await browser.newPage();

    await page.goto(GAS_BILL_URL);
    await loginGasBill(page);
    await gotoBillDetailPage(page);
    amount = await scrapeGasBillFromDetail(page, year, month);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }

  return amount;
};

const loginGasBill = async (page: Page): Promise<void> => {
  const GAS_BILL_USER = process.env.GAS_BILL_USER || '';
  const GAS_BILL_PASSWORD = process.env.GAS_BILL_PASSWORD || '';

  if (!GAS_BILL_USER || !GAS_BILL_PASSWORD) {
    throw new Error('required gas env');
  }

  await page.waitForSelector('input#login-localuserid__c');
  await page.type('input#login-localuserid__c', GAS_BILL_USER);

  await page.waitForSelector('input#login-password');
  await page.type('input#login-password', GAS_BILL_PASSWORD);

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    page.click('button#login-submit'),
  ]);
};

const gotoBillDetailPage = async (page: Page): Promise<void> => {
  await page.waitForSelector('a#contract-webdetails');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    page.click('a#contract-webdetails'),
  ]);
};

const scrapeGasBillFromDetail = async (
  page: Page,
  year: Year,
  month: Month,
): Promise<number | undefined> => {
  await page.waitForSelector('select#webdatails-yearmonth');

  const _year = String(year).padStart(4, '0');
  const _month = String(month).padStart(2, '0');
  const targetOptionValue = _year + _month;
  const optionXpath = `//option[@value="${targetOptionValue}"]`;
  const $targetOption = await page.$x(optionXpath);

  if ($targetOption.length <= 0) {
    return undefined;
  }

  await page.select('select#webdatails-yearmonth', targetOptionValue);
  await delay(500);

  const amountXpath = `//dt[text() = "ご請求額（税込）"]/following-sibling::dd[1]`;
  await page.waitForXPath(amountXpath);

  const amountString = await getTextContent((await page.$x(amountXpath))[0]);
  const amount = Number(amountString.replace(/[円,]/g, ''));

  if (!isNaN(amount)) return amount;

  return undefined;
};
