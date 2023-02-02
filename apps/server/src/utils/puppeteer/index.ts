import { ElementHandle } from 'puppeteer-core';

export const getTextContent = async <T extends Node>(
  element: ElementHandle<T>,
): Promise<string> => {
  const textContent = await element.getProperty('textContent');

  return textContent.jsonValue();
};
