import { test, expect, Page } from '@playwright/test';

const url = process.env.URL!;
const email = process.env.EMAIL!;
const password = process.env.PASSWORD!;
const articleTitle = `Test Article for Playwright MCP Server ${Date.now()}`;
const articleAbout = 'This is a test article about Playwright MCP Server';
const articleContent = 'This article is created by Playwright MCP Server test automation';
const updatedArticleTitle = `Updated ${articleTitle}`;
const updatedArticleAbout = 'Updated article about Playwright MCP Server';
const updatedArticleContent = 'This article has been updated by Playwright MCP Server';

class ArticlePage {
  constructor(private page: Page) {}

  get nav() {
    return {
      signIn: this.page.getByRole('link', { name: 'Sign in' }),
      newArticle: this.page.getByRole('link', { name: /New Article/ }),
      username: (username: string) => this.page.getByRole('link', { name: username }),
      home: this.page.getByRole('link', { name: 'Home' }),
    };
  }

  get loginForm() {
    return {
      email: this.page.getByRole('textbox', { name: 'Email' }),
      password: this.page.getByRole('textbox', { name: 'Password' }),
      submit: this.page.getByRole('button', { name: 'Sign in' }),
    };
  }

  get editorForm() {
    return {
      title: this.page.getByRole('textbox', { name: 'Article Title' }),
      about: this.page.getByRole('textbox', { name: "What's this article about?" }),
      content: this.page.getByRole('textbox', { name: /Write your article/ }),
      publish: this.page.getByRole('button', { name: 'Publish Article' }),
    };
  }

  get article() {
    return {
      title: (title: string) => this.page.getByRole('heading', { name: title }),
      edit: this.page.getByRole('link', { name: /Edit Article/ }).first(),
      delete: this.page.getByRole('button', { name: /Delete Article/ }).first(),
    };
  }

  async login(email: string, password: string, username: string) {
    await this.nav.signIn.click();
    await expect(this.page).toHaveURL(/.*login/);
    await this.loginForm.email.fill(email);
    await this.loginForm.password.fill(password);
    await this.loginForm.submit.click();
    await expect(this.nav.username(username)).toBeVisible({ timeout: 10000 });
  }

  async createArticle(title: string, about: string, content: string) {
    await this.nav.newArticle.click();
    await expect(this.page).toHaveURL(/.*editor/);
    await this.editorForm.title.fill(title);
    await this.editorForm.about.fill(about);
    await this.editorForm.content.fill(content);
    await this.editorForm.publish.click();
    await expect(this.article.title(title)).toBeVisible({ timeout: 10000 });
  }

  async editArticle(updatedTitle: string, updatedAbout: string, updatedContent: string) {
    await this.article.edit.click();
    await expect(this.page).toHaveURL(/.*editor/);
    await this.editorForm.title.clear();
    await this.editorForm.title.fill(updatedTitle);
    await this.editorForm.about.clear();
    await this.editorForm.about.fill(updatedAbout);
    await this.editorForm.content.clear();
    await this.editorForm.content.fill(updatedContent);
    await this.editorForm.publish.click();
    await expect(this.article.title(updatedTitle)).toBeVisible({ timeout: 10000 });
  }

  async deleteArticle() {
    await this.article.delete.click();
    await this.page.waitForLoadState('networkidle');
  }
}

test.describe('Articles Management E2E', () => {
  test('should login, create, edit, and delete an article', async ({ page }) => {
    const app = new ArticlePage(page);
    
    // Navigate to the application
    await page.goto(url);
    await expect(page).toHaveTitle(/Conduit/);
    
    // Login
    const username = email.split('@')[0];
    await app.login(email, password, username);
    
    // Verify login was successful
    await expect(app.nav.username(username)).toBeVisible();
    
    // Create a new article
    await app.createArticle(articleTitle, articleAbout, articleContent);
    
    // Verify article was created
    await expect(page).toHaveURL(/.*article/);
    await expect(app.article.title(articleTitle)).toBeVisible();
    
    // Edit the article
    await app.editArticle(updatedArticleTitle, updatedArticleAbout, updatedArticleContent);
    
    // Verify article was updated
    await expect(app.article.title(updatedArticleTitle)).toBeVisible();
    await expect(page.getByText(updatedArticleContent)).toBeVisible();
    
    // Delete the article
    await app.deleteArticle();
    
    // Verify article was deleted by checking user profile
    await page.goto(`${url}profile/${username}`);
    await expect(page.getByText('No articles are here... yet.')).toBeVisible({ timeout: 10000 });
  });
});
