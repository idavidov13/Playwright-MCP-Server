import { test, expect, Page } from '@playwright/test';

const url = process.env.URL!;
const email = process.env.EMAIL!;
const password = process.env.PASSWORD!;
const articleTitle = `Test Article for Playwright MCP Server ${Date.now()}`;
const articleAbout = 'This is a test article about Playwright MCP Server';
const articleContent = 'This article is created by Playwright MCP Server test automation';
const updatedArticleTitle = `Updated ${articleTitle}`;
const updatedArticleAbout = 'Updated article about';
const updatedArticleContent = 'This article has been updated';

class ConduitApp {
  constructor(private page: Page) {}

  async navigateToHome() {
    await this.page.goto(url);
    await expect(this.page.getByRole('heading', { name: 'conduit' })).toBeVisible();
  }

  async login() {
    await this.page.getByRole('link', { name: 'Sign in' }).click();
    await this.page.getByPlaceholder('Email').fill(email);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }

  async createArticle() {
    await this.page.getByRole('link', { name: 'New Article' }).click();
    await this.page.getByPlaceholder('Article Title').fill(articleTitle);
    await this.page.getByPlaceholder('What\'s this article about?').fill(articleAbout);
    await this.page.getByPlaceholder('Write your article (in markdown)').fill(articleContent);
    await this.page.getByRole('button', { name: 'Publish Article' }).click();
    await expect(this.page.getByRole('heading', { name: articleTitle })).toBeVisible();
  }

  async editArticle() {
    await this.page.getByRole('link', { name: 'Edit Article' }).first().click();
    await this.page.getByPlaceholder('Article Title').fill(updatedArticleTitle);
    await this.page.getByPlaceholder('What\'s this article about?').fill(updatedArticleAbout);
    await this.page.getByPlaceholder('Write your article (in markdown)').fill(updatedArticleContent);
    await this.page.getByRole('button', { name: 'Publish Article' }).click();
    await expect(this.page.getByRole('heading', { name: updatedArticleTitle })).toBeVisible();
  }

  async deleteArticle() {
    await this.page.getByRole('button', { name: 'Delete Article' }).first().click();
    await expect(this.page.getByText(updatedArticleTitle)).toBeVisible();
  }
}

test.describe('Conduit App Article Management', () => {
  test('should navigate, login, create, edit, and delete an article', async ({ page }) => {
    const app = new ConduitApp(page);
    await app.navigateToHome();
    await app.login();
    await app.createArticle();
    await app.editArticle();
    await app.deleteArticle();
  });
});
