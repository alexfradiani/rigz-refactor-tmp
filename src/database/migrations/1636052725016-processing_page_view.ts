import { MigrationInterface, QueryRunner } from "typeorm";

export class processingPageView1636052725016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create or replace view processing_page as
      select * from processing_page_set_1
      union all
      select * from processing_page_set_2
      order by carrierId;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop view processing_page;");
  }
}
