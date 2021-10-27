/* eslint-disable brace-style */
/* eslint-disable indent */
import { MigrationInterface, QueryRunner } from "typeorm";

export class lastCarrierTransactionView1634905780564
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create or replace view last_carrier_transaction as
      select
        ft.carrierAmount, ca.id as carrierId,
          MAX(ft.date) AS \`lastDate\`
      from
        financial_transaction as ft
      inner join
        \`load\` as lo on lo.id = ft.loadId
      inner join
        carrier as ca on ca.id = lo.carrierId
      group by ca.id;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop view last_carrier_transaction;");
  }
}
