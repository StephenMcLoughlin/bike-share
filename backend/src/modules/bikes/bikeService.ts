import { Database } from "../../db/db";

class BikeService {
  db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async getBikes() {}

  async getBikeById() {}
}

export default BikeService;
