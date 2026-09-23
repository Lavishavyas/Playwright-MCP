import { Page } from '@playwright/test';

import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly productsLabel;
  readonly shoppingCart;

  constructor(page: Page) {
    super(page);
    this.productsLabel = page.getByText('Products', { exact: true });
    this.shoppingCart = page.getByRole('button', { name: 'Cart, empty' });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }
}