import { MigrationInterface, QueryRunner } from "typeorm";

export class foreignConstraints1634838205468 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`collection_board\` ADD CONSTRAINT 
      \`FK_e9b99e66ed66c72c1ed24fff5a7\` FOREIGN KEY (\`carrierId\`) 
      REFERENCES \`carrier\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION;
    `);
    await queryRunner.query(`
      ALTER TABLE \`financial_transaction\` ADD CONSTRAINT
      \`FK_b9761362eda607458cba7dee72b\` FOREIGN KEY (\`loadId\`)
      REFERENCES \`load\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION;
    `);
    await queryRunner.query(`
      ALTER TABLE \`load\` ADD CONSTRAINT
      \`FK_9613f439ee66a5fa9669bc655d8\` FOREIGN KEY (\`carrierId\`)
      REFERENCES \`carrier\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION;
    `);
    await queryRunner.query(`
      ALTER TABLE \`user\` ADD CONSTRAINT \`FK_ec9807dfb00005cbe90404c70e8\`
      FOREIGN KEY (\`processingLoadId\`) REFERENCES \`load\`(\`id\`)
      ON DELETE NO ACTION ON UPDATE NO ACTION;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`collection_board\` DROP FOREIGN KEY \`carrierId\`; 
    `);
    await queryRunner.query(`
      ALTER TABLE \`financial_transaction\` DROP FOREIGN KEY \`loadId\`; 
    `);
    await queryRunner.query(`
      ALTER TABLE \`load\` DROP FOREIGN KEY \`carrierId\`;
    `);
    await queryRunner.query(`
      ALTER TABLE \`user\` DROP FOREIGN KEY \`processingLoadId\`; 
    `);
  }
}
