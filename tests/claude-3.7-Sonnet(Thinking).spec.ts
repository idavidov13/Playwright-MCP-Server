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

class ConduitPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  get loginButton() { return this.page.getByRole('link', { name: 'Sign in' }); }
  get emailInput() { return this.page.getByRole('textbox', { name: 'Email' }); }
  get passwordInput() { return this.page.getByRole('textbox', { name: 'Password' }); }
  get signInButton() { return this.page.getByRole('button', { name: 'Sign in' }); }
  get newArticleButton() { return this.page.getByRole('link', { name: ' New Article' }); }
  get articleTitleInput() { return this.page.getByRole('textbox', { name: 'Article Title' }); }
  get articleAboutInput() { return this.page.getByRole('textbox', { name: 'What\'s this article about?' }); }
  get articleContentInput() { return this.page.getByRole('textbox', { name: 'Write your article (in' }); }
  get publishArticleButton() { return this.page.getByRole('button', { name: 'Publish Article' }); }
  get editArticleButton() { return this.page.getByRole('link', { name: ' Edit Article' }).first(); }
  get deleteArticleButton() { return this.page.getByRole('button', { name: ' Delete Article' }).first(); }
  get articleTitleHeading() { return this.page.getByRole('heading', { level: 1 }); }
  get yourFeedTab() { return this.page.getByText('Your Feed'); }

  // Actions
  async navigate() {
    await this.page.goto(url);
  }

  async login() {
    // Check if already logged in
    if (await this.page.getByRole('link', { name: 'Sign in' }).isVisible()) {
      await this.loginButton.click();
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.signInButton.click();
      // Verify login successful
      await expect(this.page.getByRole('link', { name: 'idavidov' })).toBeVisible();
    }
  }

  async createArticle(title: string, about: string, content: string) {
    await this.newArticleButton.click();
    await this.articleTitleInput.fill(title);
    await this.articleAboutInput.fill(about);
    await this.articleContentInput.fill(content);
    await this.publishArticleButton.click();

    // Verify article was created
    await expect(this.articleTitleHeading).toHaveText(title);
  }

  async editArticle(title: string, about: string, content: string) {
    await this.editArticleButton.click();
    await this.articleTitleInput.fill(title);
    await this.articleAboutInput.fill(about);
    await this.articleContentInput.fill(content);
    await this.publishArticleButton.click();

    // Verify article was updated
    await expect(this.articleTitleHeading).toHaveText(title);
  }

  async deleteArticle() {
    await this.deleteArticleButton.click();
    // Verify we're redirected to home page
    await expect(this.yourFeedTab).toBeVisible();
  }
}

test.describe('Conduit Article Management', () => {
  test('should create, edit, and delete an article', async ({ page }) => {
    const conduitPage = new ConduitPage(page);
    
    // Navigate to the application
    await conduitPage.navigate();
    await expect(page).toHaveTitle(/Conduit/);
    
    // Login (if not already logged in)
    await conduitPage.login();
    
    // Create a new article
    await conduitPage.createArticle(articleTitle, articleAbout, articleContent);
    
    // Edit the article
    await conduitPage.editArticle(updatedArticleTitle, updatedArticleAbout, updatedArticleContent);
    
    // Delete the article
    await conduitPage.deleteArticle();
  });
});
