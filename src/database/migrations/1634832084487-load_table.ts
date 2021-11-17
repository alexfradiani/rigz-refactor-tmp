import { MigrationInterface, QueryRunner } from "typeorm";

export class loadTable1634832084487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`load\` 
      (\`id\` int NOT NULL AUTO_INCREMENT, 
      \`carrierFee\` int NOT NULL, 
      \`isActive\` tinyint NOT NULL, 
      \`dueDate\` datetime NOT NULL, 
      \`doNotPayFactoring\` tinyint NOT NULL,
      \`carrierId\` int NULL, 
      \`factoringCompanyId\` int NULL, 
      PRIMARY KEY (\`id\`))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop table `load`;");
  }
}
