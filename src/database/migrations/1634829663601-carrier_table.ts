import { MigrationInterface, QueryRunner } from "typeorm";

export class carrierTable1634829663601 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`carrier\` (
          \`id\` int(11) NOT NULL AUTO_INCREMENT,
          \`displayId\` varchar(255) NOT NULL,
          \`name\` varchar(255) NOT NULL,
          \`factoringCompanyId\` int(11) DEFAULT NULL,
          \`paymentTerms\` varchar(255) NOT NULL,
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`REL_f4f5ea4120af17a09d8f9c6e9f\` 
          (\`factoringCompanyId\`),
          CONSTRAINT \`FK_f4f5ea4120af17a09d8f9c6e9f2\` 
          FOREIGN KEY (\`factoringCompanyId\`) 
          REFERENCES \`factoring_company\` (\`id\`) 
          ON DELETE NO ACTION ON UPDATE NO ACTION
        )
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop table `carrier`;");
  }
}
