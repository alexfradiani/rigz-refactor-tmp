import { MigrationInterface, QueryRunner } from "typeorm";

export class loadHolds1636390699302 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create or replace view load_holds as
      select 
        lo.dueDate, lo.id as loadNumber,
        ca.name as carrierName,
        fc.name as factoringCompanyName,
        tr.loadProfitAmount as lastLoadProfitAmount,
        case 
        when lo.factoringCompanyId is null or lo.doNotPayFactoring = true 
            then ca.paymentTerms
        else fc.paymentTerms
        end as paymentTerms,
        htype.name as holdType
      from 
        \`load\` as lo
      inner join
        load_last_transaction as tr on lo.id = tr.loadId
      inner join 
        carrier as ca on lo.carrierId = ca.id
      left join
        factoring_company as fc on fc.id = lo.factoringCompanyId
      inner join
        payment_hold as h on h.loadId = lo.id
      inner join 
        payment_hold_type as htype on htype.id = h.paymentHoldTypeId;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop view `load_holds`");
  }
}
