import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * used by processing page:
 * loads for carriers that will show payment method /
 * payment terms of the factoring company. That is:
 * all loads that have factoringCompanyId defined (not null)
 * AND that have doNotPayFactoring set to FALSE
 */
export class carrierLoadsSet2View1636047950406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create or replace view carrier_loads_set_2 as
      select 
        carrierId, GROUP_CONCAT(id SEPARATOR ', ') as loadIds
      from
        \`load\` as lo
      where lo.factoringCompanyId is not NULL and lo.doNotPayFactoring = 0
      group by carrierId;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop view carrier_loads_set_2;");
  }
}
