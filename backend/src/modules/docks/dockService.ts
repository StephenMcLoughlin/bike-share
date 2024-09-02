import { Database } from "../../db/db";

class DockService {
  db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async getDocks() {}

  async getDockById() {}
}

export default DockService;
