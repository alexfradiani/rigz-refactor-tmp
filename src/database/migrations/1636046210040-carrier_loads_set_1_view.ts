import { MigrationInterface, QueryRunner } from "typeorm";

export class carrierLoadsSet1View1636046210040 implements MigrationInterface {
  /**
   * used by processing page:
   * loads for carriers that will show payment method /
   * payment terms of the carrier. That is:
   * all loads that have factoringCompanyId set to null
   * OR that have doNotPayFactoring set to TRUE
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create or replace view carrier_loads_set_1 as
      select 
        carrierId, GROUP_CONCAT(id SEPARATOR ', ') as loadIds
      from
        \`load\` as lo
      where lo.factoringCompanyId is NULL or lo.doNotPayFactoring = 1
      group by carrierId;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop view carrier_loads_set_1;");
  }
}
