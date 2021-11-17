import { MigrationInterface, QueryRunner } from "typeorm";

export class paymentMethodTable1636039294242 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`payment_method\` (\`id\` int NOT NULL AUTO_INCREMENT, 
      \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop table `payment_method`;");
  }
}
