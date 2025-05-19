# Playwright-MCP-Server
Set Up and Utilization of Playwright MCP (Model Context Protocol) Server in [Windsurf IDE](https://windsurf.com/)

## Table of Contents

-   [Introduction](#introduction)
-   [Main Goal](#main-goal)
-   [Used LLMs](#used-llms)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Configure Playwright MCP Server](#configure-playwright-mcp-server)
-   [Add Custom Instructions](#add-custom-instructions)
-   [Test Data](#test-data)
-   [Generate Test with Playwright MCP Server and GPT-4.1](#generate-test-with-playwright-mcp-server-and-gpt-41)
-   [Generate Test with Playwright MCP Server and Claude 3.7 Sonnet (Thinking)](#generate-test-with-playwright-mcp-server-and-claude-3.7-sonnet-thinking)
-   [Generate Test with Playwright MCP Server and DeepSeek R1](#generate-test-with-playwright-mcp-server-and-deepseek-r1)
-   [Generate Test with Playwright MCP Server and SWE-1](#generate-test-with-playwright-mcp-server-and-swe-1)
-   [Generate Test with Playwright MCP Server and xAI Grok-3](#generate-test-with-playwright-mcp-server-and-xai-grok-3)
-   [Comparison of Generated POMs](#comparison-of-generated-poms)
-   [Comparison of Generated Tests](#comparison-of-generated-tests)
-   [Disclaimer](#disclaimer)

## Introduction

Playwright’s MCP (Multi-Channel Protocol) is a low-level protocol that enables communication between the Playwright client and browser servers (such as Chromium, Firefox, and WebKit). MCP is designed to be transport-agnostic, supporting communication over WebSockets, pipes, or other channels, and is the foundation for Playwright’s cross-browser automation capabilities.

## Main Goal
Playwright MCP (Model Context Protocol) Server is a tool that allows you to generate better Playwright tests with LLMs by providing much helpful context to the LLMs and ability to interact with the browsers. I try to generate tests for web app [Conduit](https://conduit.bondaracademy.com/) and compare the final results.
You can find the repository with MVP(Minimal Viable Product) for [Playwright Automation Framework](https://github.com/idavidov13/Playwright-Framework) for the same web app, which features TypeScript, Page Object Model Design Pattern, Custom Fixtures, REST API Testing and Mocking, Schema Validation with Zod, Environment Utilization, and CI/CD integration with GitHub Actions and GitLab CI/CD which I created before this repository.

### Used LLMs

-   GPT-4.1
-   Claude 3.7 Sonnet (Thinking)
-   DeepSeek R1
-   SWE-1
-   xAI Grok-3

## Prerequisites

-   **Node.js** (version 20.13.1 or later)
-   **npm** (version 10 or later)

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/idavidov13/Playwright-MCP-Server.git
    cd Playwright-MCP-Server
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Install Playwright Browsers:**

    ```sh
    npx playwright install --with-deps
    ```

    This command ensures all necessary browser binaries and dependencies are installed.

## Configure Playwright MCP Server

Follow the instructions in the [Playwright MCP Server documentation](https://github.com/microsoft/playwright-mcp?tab=readme-ov-file) to configure the Playwright MCP Server.

## Add Custom Instructions

Create a folder .windserf/rules in the root of the project. Add a file playwright-mcp-server-test-generator.md in the .windserf/rules folder. Select "Always On" option from the dropdown menu. Put following content in Content Textarea:

```
1. You are a playwright test generator.
2. You are given a scenario and you need to generate a playwright test for it.
3. DO NOT generate test code based on the scenario alone.
4. DO run steps one by one using the tools provided by the Playwright MCP.
5. Only after all steps are completed, emit a Playwright TypeScript test that uses '@playwright/test'. Below are instruction for generating the test:
5.1. You are an expert in TypeScript, Frontend development, and Playwright end-to-end testing.
You write concise, technical TypeScript code with accurate examples and the correct types.
-   Create Class for all locators and methods for all actions
-   Avoid using `page.locator` and always use recommended build-in and role-based locators (`getByRole`, `getByLabel`, etc)
-   Prefer to use web-first assertions (`toBeVisible`, `toHaveText`, etc) whenever possible
-   Use build in config objects like `devices` whenever possible
-   Avoid hardcoded timeouts
-   Reuse Playwright locators by using variables
-   Follow the guidance and the best practices described on playwright.dev
-   Avoid commenting the resulting code
6. Save generated test file in the tests directory
7. Execute the test file and iterate until the test passes
```

## Test Data

Create a test file "yourTestName.spec.ts" add the test data as follows:

```ts
const url = process.env.URL || 'https://conduit.bondaracademy.com/';
const email = process.env.EMAIL || 'yourEmail';
const password = process.env.PASSWORD || 'yourPassword';
const articleTitle = `Test Article for Playwright MCP Server ${Date.now()}`;
const articleAbout = 'This is a test article about Playwright MCP Server';
const articleContent = 'This article is created by Playwright MCP Server test automation';
const updatedArticleTitle = `Updated ${articleTitle}`;
const updatedArticleAbout = 'Updated article about';
const updatedArticleContent = 'This article has been updated';

```

## Generate Test with Playwright MCP Server and GPT-4.1

1. Select GPT-4.1 as a model
2. Run the following prompt:

```
@gpt-4.1.spec.ts Create a test case utilizing provided constanst for navigating to the web app, login, create/edit/delete an article. Try to verify the result after every major step. Use provided instructions
```

After completion of the test, you can run it with the following command:

```sh
npx playwright test yourTestName.spec.ts
```

**Note:** The provided example was generated from the first time. Only update which was needed to be made was to specify `.first()` for the delete button and edit button. 

## Generate Test with Playwright MCP Server and Claude 3.7 Sonnet (Thinking)

1. Select Claude 3.7 Sonnet (Thinking) as a model
2. Run the following prompt:

```
@claude-3.7-Sonnet(Thinking).spec.ts Create a test case utilizing provided constanst for navigating to the web app, login, create/edit/delete an article. Try to verify the result after every major step. Use provided instructions
```

After completion of the test, you can run it with the following command:

```sh
npx playwright test yourTestName.spec.ts
```

**Note:** The provided example was generated from the first time. Only update which was needed to be made was to remove 'articleContent' locator due to wrong behavior. 

## Generate Test with Playwright MCP Server and DeepSeek R1

1. Select DeepSeek R1 as a model
2. Run the following prompt:

```
@deepseek-R1.spec.ts Create a test case utilizing provided constanst for navigating to the web app, login, create/edit/delete an article. Try to verify the result after every major step. Use provided instructions
```

After completion of the test, you can run it with the following command:

```sh
npx playwright test yourTestName.spec.ts
```

**Note:** The provided example was generated from the first time. Only update which was needed to be made was to change button name from 'Update Article' to 'Publish Article' in Edit Article step due to wrong locator setup.

## Generate Test with Playwright MCP Server and SWE-1

1. Select SWE-1 as a model
2. Run the following prompt:

```
@swe-1.spec.ts Create a test case utilizing provided constanst for navigating to the web app, login, create/edit/delete an article. Try to verify the result after every major step. Use provided instructions
```

After completion of the test, you can run it with the following command:

```sh
npx playwright test yourTestName.spec.ts
```

**Note:** The provided example was generated from the first time. Updates which were needed to be made were to combine all tests (there were separate test for each action, which leads to failing tests due to single Log in), to remove one assertion for created/edited article ('await expect(app.articleAuthor).toContainText(email.split('@')[0]);'), to add `.first()` for the delete button and edit button, and to delete wrong navigation to article page. There are still unused locators, which were defined.

## Generate Test with Playwright MCP Server and xAI Grok-3

1. Select xAI Grok-3 as a model
2. Run the following prompt:

```
@xai-grok-3.spec.ts Create a test case utilizing provided constanst for navigating to the web app, login, create/edit/delete an article. Try to verify the result after every major step. Use provided instructions
```

After completion of the test, you can run it with the following command:

```sh
npx playwright test yourTestName.spec.ts
```

**Note:** The provided example was generated from the first time. Updates which were needed to be made were to remove incorrect assertion (`await expect(this.page.getByRole('link', { name: 'Your Feed' })).toBeVisible();`), to add `.first()` for the delete button and edit button, and updete assertion after delete article button click (`await expect(this.page.getByText(updatedArticleTitle)).toBeVisible();`).

## Comparison of Generated POMs

### Comparison of Page Object initialization patterns

1. Using Getters for Locators - Claude 3.7 Sonnet (Thinking)
```ts
get usernameInput() { return this.page.getByLabel('Username'); }
```
* Pros:

    * Lazy Evaluation: Locators are created only when accessed, ensuring up-to-date references.
    * Readability: Clean, property-like access (pageObject.usernameInput).
    * Encapsulation: Easy to add logic or assertions in the getter if needed.
    * IntelliSense: Good support in editors for auto-completion.
* Cons:

    * Performance: Each access creates a new locator (though Playwright locators are lightweight).
    * Inheritance: Overriding getters in subclasses can be less straightforward than overriding fields.

2. Using Private Getters - SWE-1
```ts
private get usernameInput() { return this.page.getByLabel('Username'); }
```
* Pros:

    * Encapsulation: Prevents direct access from outside the class, enforcing usage only within class methods.
    * Cleaner API: Exposes only actions, not locators, to test code.
    * Reduces Misuse: Prevents test code from making direct assertions on locators.
* Cons:

    * Test Flexibility: Makes it harder to write custom assertions or interact directly with elements from the test.
    * Discoverability: Less transparent for someone reading the test and wanting to know what elements are available.

3. Using Objects for Locators - GPT-4.1
```ts
loginForm = {
    email: this.page.getByRole('textbox', { name: 'Email' }),
    password: this.page.getByRole('textbox', { name: 'Password' }),
    submit: this.page.getByRole('button', { name: 'Sign in' }),
}
```
* Pros:

    * Centralized: All locators are grouped in one object, making them easy to find and update.
    * Reusability: Can be passed around or reused in utility functions.
    * Eager Initialization: Locators are created once in the constructor, potentially improving performance.
* Cons:

    * Stale Locators: If the page reloads or changes, locators may become stale (though Playwright locators are resilient, this can still be a concern).
    * Less Encapsulation: Test code may access locators directly, leading to less controlled interactions.

4. Using Methods Directly - xAI-Grok-3
```ts
async navigateToHome() {
    await this.page.goto(url);
    await expect(this.page.getByRole('heading', { name: 'conduit' })).toBeVisible();
}
```
* Pros:

    * Encapsulation: Only exposes actions, not locators, enforcing the Page Object pattern strictly.
    * API Clarity: Test code reads like user actions (pageObject.fillUsername('foo')).
    * Maintainability: Easy to update selectors in one place, and logic can be added to methods.
* Cons:

    * Reduced Flexibility: Cannot easily make custom assertions or interact with elements outside provided methods.
    * Verbosity: May require many methods for complex pages, leading to bloated classes.

Summary Table
| Pattern | Encapsulation | Flexibility | Readability | Staleness Risk | API Surface |
|--------------------------|:------------:|:-----------:|:-----------:|:--------------:|:-----------:|
| Getters | Medium | High | High | Low | Medium |
| Private Getters | High | Medium | Medium | Low | Low |
| Objects for Locators | Low | High | Medium | Medium | High |
| Methods Directly | High | Low | High | Low | Low |

### When to Use Each

**Getters:** When you want readable code and flexibility, and are OK with exposing locators.

**Private Getters:** When you want to strictly encapsulate element access, exposing only actions.

**Objects for Locators:** When you want centralized, reusable locators and are not concerned with strict encapsulation.

**Methods Directly:** When you want the cleanest, most maintainable API and are OK with less flexibility in tests.


## Comparison of Generated Tests

### Comparison Criterias

1. Code quality (structure, modularity, error handling)
2. Readability (clarity, naming, comments, formatting)
3. Adherence to Playwright and automation best practices (locator usage, assertions, reusability, maintainability)

### Comparison Results

1. **Claude 3.7 Sonnet (Thinking)**

    * Code Quality

        * Uses a well-structured Page Object Model (ConduitPage), grouping locators and actions as class methods/getters.
        * Good encapsulation and reusability; all page interactions are abstracted.
        * Uses role-based locators (getByRole) and avoids hardcoded selectors.
        * Handles login state check before logging in.

    * Readability

        * Clear and descriptive method names.
        * Consistent formatting and variable naming.
        * Minimal comments, but code is self-explanatory.

    * Best Practices

        * Follows Playwright best practices: web-first assertions, role-based locators, and modularity.
        * Uses environment variables for config.
        * No hardcoded timeouts.
        * Test scenario is end-to-end and readable.

2. **Deepseek-R1**

    * Code Quality

        * No Page Object Model; all actions are inline within the test.
        * Uses constants for credentials and article data.
        * Directly uses Playwright locators in test steps.
        * Lacks abstraction and reusability.

    * Readability

        * Simple, readable, but less maintainable for larger tests.
        * Variable names are clear.
        * Test is split into logical sections (Create/Edit/Delete).
        
    * Best Practices

        * Uses role-based selectors and web-first assertions.
        * No modularization; not scalable for larger suites.
        * No comments, but the structure is easy to follow.

3. **GPT-4.1**

    * Code Quality

        * Implements a Page Object Model (ArticlePage), with grouped locators and actions.
        * Uses nested objects for navigation, forms, and article actions.
        * Uses role-based and parameterized locators.
        * Good encapsulation and reusability.

    * Readability

        * Very clear structure, logical grouping, and descriptive method/variable names.
        * Minimal comments, but code is self-explanatory.
        * Consistent formatting.

    * Best Practices

        * Follows Playwright best practices: role-based selectors, web-first assertions, config via env vars.
        * No hardcoded timeouts.
        * Test covers all CRUD actions and checks for post-deletion state.

4. **SWE-1**

    * Code Quality

        * Implements a Page Object Model (ConduitApp) with private getters for locators and methods for actions.
        * Good encapsulation and modularity.
        * Uses role-based selectors and web-first assertions.
        * Has beforeAll/afterAll hooks for setup/teardown.

    * Readability

        * Clear and descriptive method names.
        * Consistent formatting and logical structure.

    * Best Practices

        * Follows Playwright recommendations: modularity, role-based selectors, web-first assertions.
        * Uses environment variables.
        * Test is comprehensive and checks all CRUD operations.

5.  **xAI-Grok-3**

    * Code Quality

        * Implements a Page Object Model (ConduitApp) but with all data hardcoded inside methods.
        * Each action is a single method; no parameterization.
        * Uses role-based selectors and web-first assertions.
        * Less flexible for reusability.

    * Readability

        * Simple and readable, but less scalable.
        * Method names are clear, but lack parameterization for reuse.
        * Minimal comments.

    * Best Practices

        * Uses Playwright best practices for selectors and assertions.
        * No modularization of test data.
        * Test steps are clear and sequential.

### Comparative Table

| File | POM Used | Abstraction | Readability | Best Practices | Scalability | Comments | Manual Updates |  
|---------------------------------------|----------|-------------|-------------|---------------|-------------|--------------------|------------------|
| Claude 3.7 Sonnet (Thinking) | Yes | High | High | Yes | High | Well-structured | Low |
| Deepseek-R1 | No | Low | Medium | Partial | Low | Inline logic | Low |
| GPT-4.1 | Yes | High | High | Yes | High | Well-structured | Low |
| SWE-1 | Yes | High | High | Yes | High | Hooks used, Old Setup/Teardown | High |
| xAI-Grok-3 | Yes | Medium | Medium | Yes | Medium | No parameterization| Medium |

### Conclusion
* **Best Overall (Code Quality & Best Practices)**:
    * GPT-4.1 and Claude 3.7 Sonnet (Thinking) stand out for their structured Page Object Models, modularity, and adherence to Playwright best practices. Both are highly maintainable and readable, with good abstraction and scalability.
    * SWE-1 is also strong, but could improve old browser setup/teardown. There was a need to manually update the test/locators after generation.
* Most Readable for Small Tests:
    * Deepseek R1 and xAI Grok-3 are readable and easy to follow for small, simple scenarios but lack abstraction and scalability for larger suites.
* Best for Large Automation Suites:
    * GPT-4.1 and Claude 3.7 Sonnet (Thinking) are preferred due to their maintainability, modularity, and extensibility.

## Disclaimer

This repository is intended for informational and educational purposes only. It compares the capabilities of five different Large Language Models (LLMs) in generating a single test case for Playwright, utilizing the Playwright MCP Server with the same input. The results and analyses presented do not imply any endorsement or disapproval of any specific LLM. Performance and outputs are subject to variation based on a range of factors, including but not limited to the specific input data and environment setup.

The information in this repository is provided "as is," and no warranty, express or implied, is made regarding its accuracy, reliability, or completeness. Users are advised to independently verify any results and exercise their discretion when interpreting and utilizing the findings. The authors and contributors assume no responsibility for any consequences arising from the use of the content provided within this repository.

For detailed information on the capabilities and limitations of the individual LLMs, please refer to their respective official documentation and licensing terms.
