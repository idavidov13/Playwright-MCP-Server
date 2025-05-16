import { test, expect, Page } from '@playwright/test';

// Test configuration
const url = process.env.URL!;
const email = process.env.EMAIL!;
const password = process.env.PASSWORD!;
const articleTitle = `Test Article for Playwright MCP Server ${Date.now()}`;
const articleAbout = 'This is a test article about Playwright MCP Server';
const articleContent = 'This article is created by Playwright MCP Server test automation';
const updatedArticleTitle = `Updated ${articleTitle}`;
const updatedArticleAbout = 'Updated article about';
const updatedArticleContent = 'This article has been updated';

// Page Object Model class for the application
class ConduitApp {
  constructor(private page: Page) {}

  // Locators
  private get signInLink() { return this.page.getByRole('link', { name: 'Sign in' }); }
  private get emailInput() { return this.page.getByRole('textbox', { name: 'Email' }); }
  private get passwordInput() { return this.page.getByRole('textbox', { name: 'Password' }); }
  private get signInButton() { return this.page.getByRole('button', { name: 'Sign in' }); }
  private get newArticleLink() { return this.page.getByRole('link', { name: 'New Article' }); }
  private get articleTitleInput() { return this.page.getByRole('textbox', { name: 'Article Title' }); }
  private get articleAboutInput() { return this.page.getByRole('textbox', { name: 'What\'s this article about?' }); }
  private get articleContentInput() { return this.page.getByRole('textbox', { name: 'Write your article (in markdown)' }); }
  private get publishArticleButton() { return this.page.getByRole('button', { name: 'Publish Article' }); }
  private get editArticleButton() { return this.page.getByRole('link', { name: 'Edit Article' }).first(); }
  private get deleteArticleButton() { return this.page.getByRole('button', { name: 'Delete Article' }).first(); }
  private get articleTitle() { return this.page.locator('h1'); }
  private get articleContent() { return this.page.locator('div.article-content > p'); }
  get articleAuthor() { return this.page.locator('.author'); }
  private get articleMeta() { return this.page.locator('.article-meta'); }

  // Actions
  async goto() {
    await this.page.goto(url);
  }

  async login(email: string, password: string) {
    await this.signInLink.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async createArticle(title: string, about: string, content: string) {
    await this.newArticleLink.click();
    await this.articleTitleInput.fill(title);
    await this.articleAboutInput.fill(about);
    await this.articleContentInput.fill(content);
    await this.publishArticleButton.click();
  }

  async updateArticle(newTitle: string, newAbout: string, newContent: string) {
    await this.editArticleButton.click();
    await this.articleTitleInput.fill(newTitle);
    await this.articleAboutInput.fill(newAbout);
    await this.articleContentInput.fill(newContent);
    await this.publishArticleButton.click();
  }

  async deleteArticle() {
    await this.deleteArticleButton.click();
  }
}

test.describe('Article CRUD Operations', () => {
  let page: Page;
  let app: ConduitApp;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    app = new ConduitApp(page);
    await app.goto();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should login with valid credentials', async () => {
    await app.login(email, password);
    await expect(page).toHaveURL(/\/\/conduit\.bondaracademy\.com\/$/);
    await expect(page.getByRole('link', { name: 'New Article' })).toBeVisible();

    await app.createArticle(articleTitle, articleAbout, articleContent);
    
    // Verify article was created successfully
    await expect(page.getByRole('heading', { name: articleTitle })).toBeVisible();
    await expect(page.getByText(articleContent)).toBeVisible();

    await app.updateArticle(updatedArticleTitle, updatedArticleAbout, updatedArticleContent);
    
    // Verify article was updated successfully
    await expect(page.getByRole('heading', { name: updatedArticleTitle })).toBeVisible();
    await expect(page.getByText(updatedArticleContent)).toBeVisible();

    // Delete the article
    await app.deleteArticle();
    
    // Verify article was deleted successfully by checking the home page
    await expect(page).toHaveURL(/\/\/conduit\.bondaracademy\.com\/$/);
    await expect(page.getByRole('heading', { name: updatedArticleTitle })).not.toBeVisible();
  });
});
