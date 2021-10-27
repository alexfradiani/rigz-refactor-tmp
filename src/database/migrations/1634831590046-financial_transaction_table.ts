/* eslint-disable indent */
/* eslint-disable brace-style */
import { MigrationInterface, QueryRunner } from "typeorm";

export class financialTransactionTable1634831590046
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`financial_transaction\` 
      (\`id\` int NOT NULL AUTO_INCREMENT, 
      \`carrierAmount\` int NOT NULL, 
      \`carrierCBAmount\` int NOT NULL, 
      \`carrierPending\` int NOT NULL, 
      \`customerAmount\` int NOT NULL, 
      \`loadProfitAmount\` int NOT NULL, 
      \`type\` varchar(255) NOT NULL, 
      \`date\` datetime NOT NULL, 
      \`loadId\` int NULL, PRIMARY KEY (\`id\`));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop table `financial_transaction`;");
  }
}
