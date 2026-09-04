import { QueryInterface } from 'sequelize';

export default {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    casts JSON NOT NULL,
    genres JSON NOT NULL,
    trailer_url VARCHAR(500) NOT NULL,
    language VARCHAR(100) NOT NULL DEFAULT 'English',
    release_date DATE NOT NULL,
    director VARCHAR(255) NOT NULL,
    release_status VARCHAR(50) NOT NULL DEFAULT 'RELEASED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);`)
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS movies;
    `);
  }
};