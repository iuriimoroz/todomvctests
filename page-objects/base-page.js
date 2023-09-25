import dotenv from 'dotenv';
dotenv.config();

export class BasePage {
  constructor(page) {
    this.page = page;
  }
  async navigate() {
    await this.page.goto(process.env.BASE_URL);
  }
  async reload() {
    await this.page.reload();
  }
}
