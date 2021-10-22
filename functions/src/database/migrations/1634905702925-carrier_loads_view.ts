import { MigrationInterface, QueryRunner } from "typeorm";

export class carrierLoadsView1634905702925 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create or replace view carrier_loads as
      select 
        carrierId, GROUP_CONCAT(id SEPARATOR ', ') as loadIds
      from
        \`load\` as lo
      group by carrierId;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop view carrier_loads;");
  }
}
