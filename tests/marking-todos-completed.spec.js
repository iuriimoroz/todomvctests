import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects';
import { TODO_ITEMS } from '../test-data/todo_items';

test.describe('Mark some todo items as completed', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        homePage.navigate();
    });

    test('Verify that user can mark todo item/items as completed', async ({ page }) => {
        homePage = new HomePage(page);

        // Create 3 items
        await homePage.createDefaultTodos(TODO_ITEMS);

        // Ensure that items were added
        await homePage.toDoCounter.shouldHaveText('3 items left');

        // Check first item
        await homePage.checkTodoByText(TODO_ITEMS[0]);
        await homePage.toDoCounter.shouldHaveText('2 items left');

        // Check second item
        await homePage.checkTodoByText(TODO_ITEMS[1]);
        await homePage.toDoCounter.shouldHaveText('1 item left');

        // Assert completed todos
        await expect(await homePage.getTodoItemLocatorByText(TODO_ITEMS[0])).toHaveClass('completed');
        await expect(await homePage.getTodoItemLocatorByText(TODO_ITEMS[1])).toHaveClass('completed');

    });
});