import { MigrationInterface, QueryRunner } from "typeorm";

export class lastCarrierCbView1634905758785 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create or replace view last_carrier_cb as
      select
        cb.carrierBalance, cb.carrierId,
          MAX(cb.date) AS \`lastDate\`
      from
        collection_board as cb
      group by cb.carrierId;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop view last_carrier_cb;");
  }
}
