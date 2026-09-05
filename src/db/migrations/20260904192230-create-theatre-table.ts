import { QueryInterface } from 'sequelize';

export default {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
CREATE TABLE theatres (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    pin VARCHAR(10),
    address TEXT,
    owner_id BIGINT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
);
`);
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS theatres;
    `);
  }
};