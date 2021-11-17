import { MigrationInterface, QueryRunner } from "typeorm";

export class loadLastTransaction1636390678788 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create or replace view \`load_last_transaction\` as
      select 
        tr.loadId,
        tr.loadProfitAmount AS loadProfitAmount,
        max(tr.date) AS lastDate
      from
        financial_transaction as tr
      group by
        tr.loadId;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop view `load_last_transaction`");
  }
}
