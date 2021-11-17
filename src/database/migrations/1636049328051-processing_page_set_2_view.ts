import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * used by processing page:
 * second part of records, these take from:
 * carrier_loads_set_2 and uses the factoring company paymentTerms
 */
export class processingPageSet2View1636049328051 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create or replace view processing_page_set_2 as
      select
        ca.id as carrierId, ca.displayId as carrierDisplayId, 
        ca.name as carrierName,
        fc.name as factoringCompanyName,
        ca_loads.loadIds,
        lastTr.carrierAmount as lastCarrierAmount,
        lastCb.carrierBalance as lastCarrierCB,
        fc.paymentTerms as payTerms,
        pm.id as paymentMethodId,
        u.name as username
      from 
        carrier as ca 
      inner join 
        carrier_loads_set_2 as ca_loads on ca_loads.carrierId = ca.id
      left join
        factoring_company as fc on ca.factoringCompanyId = fc.id
      left join
        last_carrier_transaction as lastTr on lastTr.carrierId = ca.id
      left join
        last_carrier_cb as lastCb on lastCb.carrierId = ca.id
      left join
        payment_method as pm on pm.id = fc.paymentMethodId
      left join
        \`user\` as u on u.processingCarrierId = ca.id;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop view processing_page_set_2;");
  }
}
