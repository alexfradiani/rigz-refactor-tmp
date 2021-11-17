import { MigrationInterface, QueryRunner } from "typeorm";

export class paymentHoldTable1636042212991 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`payment_hold\` (\`id\` int NOT NULL AUTO_INCREMENT, 
      \`loadId\` int NULL, \`paymentHoldTypeId\` int NULL, 
      UNIQUE INDEX \`REL_357437687c795f0aa7400c4176\` (\`loadId\`), 
      PRIMARY KEY (\`id\`))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop table `payment_hold`;");
  }
}
