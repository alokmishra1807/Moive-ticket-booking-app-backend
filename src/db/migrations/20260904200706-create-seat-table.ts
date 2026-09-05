import { QueryInterface } from 'sequelize';

export default {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
 CREATE TABLE seats (
          id BIGINT PRIMARY KEY AUTO_INCREMENT,

          screen_id BIGINT NOT NULL,

          row_name CHAR(1) NOT NULL,
          seat_number INT NOT NULL,

          seat_type ENUM(
              'NORMAL',
              'PREMIUM',
              'RECLINER'
          ) DEFAULT 'NORMAL',

          is_active BOOLEAN DEFAULT TRUE,

          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
              ON UPDATE CURRENT_TIMESTAMP,
          deleted_at TIMESTAMP NULL DEFAULT NULL,

          FOREIGN KEY (screen_id)
              REFERENCES screens(id)
              ON DELETE CASCADE,

          UNIQUE(screen_id, row_name, seat_number)
      );
    `)
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS seats;
    `);
  }
};