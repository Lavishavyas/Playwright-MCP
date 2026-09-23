import { Page } from '@playwright/test';

import { BasePage } from './BasePage';
import { InventoryPage } from './InventoryPage';

export class LoginPage extends BasePage {
  readonly usernameInput;
  readonly passwordInput;
  readonly loginButton;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(username: string, password: string): Promise<InventoryPage> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    return new InventoryPage(this.page);
  }
}