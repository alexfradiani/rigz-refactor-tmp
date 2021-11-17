import { MigrationInterface, QueryRunner } from "typeorm";

export class carrierTable1634829663601 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`carrier\` (\`id\` int NOT NULL AUTO_INCREMENT, 
      \`displayId\` varchar(255) NOT NULL, 
      \`name\` varchar(255) NOT NULL, 
      \`paymentTerms\` varchar(255) NOT NULL, 
      \`factoringCompanyId\` int NULL, 
      \`paymentMethodId\` int NULL, 
      PRIMARY KEY (\`id\`))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop table `carrier`;");
  }
}
