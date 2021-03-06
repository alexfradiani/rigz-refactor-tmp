import { MigrationInterface, QueryRunner } from "typeorm";

export class factoringCompanyTable1634827544697 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`factoring_company\` (
        \`id\` int(11) NOT NULL AUTO_INCREMENT,
        \`name\` varchar(255) NOT NULL,
        PRIMARY KEY (\`id\`)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      drop table \`factoring_company\`;
    `);
  }
}
