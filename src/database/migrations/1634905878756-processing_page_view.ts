import { MigrationInterface, QueryRunner } from "typeorm";

export class processingPageView1634905878756 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create or replace view processing_page as
      select
          ca.id as carrierId, ca.displayId as carrierDisplayId, 
          ca.name as carrierName,
          fc.name as factoringCompanyName,
          ca_loads.loadIds,
          lastTr.carrierAmount as lastCarrierAmount,
          lastCb.carrierBalance as lastCarrierCB
      from 
        carrier as ca 
      inner join 
        factoring_company as fc on ca.factoringCompanyId = fc.id
      inner join 
        carrier_loads as ca_loads on ca_loads.carrierId = ca.id
      inner join
        last_carrier_transaction as lastTr on lastTr.carrierId = ca.id
      inner join
        last_carrier_cb as lastCb on lastCb.carrierId = ca.id;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop view processing_page;");
  }
}
