import { QueryInterface } from 'sequelize';

export default {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
CREATE TABLE screens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    theatre_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,

    total_rows INT NOT NULL,
    total_columns INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,

    FOREIGN KEY (theatre_id)
        REFERENCES theatres(id)
        ON DELETE CASCADE
);
    `)
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS screens;
    `);
  }
};