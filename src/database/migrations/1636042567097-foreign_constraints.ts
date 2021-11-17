import { MigrationInterface, QueryRunner } from "typeorm";

export class foreignConstraints1636042567097 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`collection_board\` ADD CONSTRAINT 
      \`FK_e9b99e66ed66c72c1ed24fff5a7\` FOREIGN KEY (\`carrierId\`) 
      REFERENCES \`carrier\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION;
    `);

    await queryRunner.query(`
      ALTER TABLE \`factoring_company\` ADD CONSTRAINT 
      \`FK_054d9e99b475905f5a863e370f7\` FOREIGN KEY (\`paymentMethodId\`) 
      REFERENCES \`payment_method\`(\`id\`) 
      ON DELETE NO ACTION ON UPDATE NO ACTION
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
      ALTER TABLE \`load\` ADD CONSTRAINT \`FK_55746289ba3d1dac4980ea968cd\` 
      FOREIGN KEY (\`factoringCompanyId\`) 
      REFERENCES \`factoring_company\`(\`id\`) 
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE \`carrier\` ADD CONSTRAINT \`FK_f4f5ea4120af17a09d8f9c6e9f2\` 
      FOREIGN KEY (\`factoringCompanyId\`) 
      REFERENCES \`factoring_company\`(\`id\`) 
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE \`carrier\` ADD CONSTRAINT \`FK_19504ecfb42a7eb8718a3ea0288\` 
      FOREIGN KEY (\`paymentMethodId\`) REFERENCES \`payment_method\`(\`id\`) 
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE \`user\` ADD CONSTRAINT \`FK_8daccf683c47b9b84e8c645eb7d\` 
      FOREIGN KEY (\`processingCarrierId\`) REFERENCES \`carrier\`(\`id\`) 
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE \`payment_hold\` ADD CONSTRAINT 
      \`FK_357437687c795f0aa7400c4176b\` FOREIGN KEY (\`loadId\`) 
      REFERENCES \`load\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE \`payment_hold\` ADD CONSTRAINT 
      \`FK_1b6dfbe8e3073e9b2bd5d3b2301\` FOREIGN KEY (\`paymentHoldTypeId\`) 
      REFERENCES \`payment_hold_type\`(\`id\`) 
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`collection_board\` DROP FOREIGN KEY \`carrierId\`; 
    `);

    await queryRunner.query(`
      ALTER TABLE \`factoring_company\` DROP FOREIGN KEY \`paymentMethodId\`; 
    `);

    await queryRunner.query(`
      ALTER TABLE \`financial_transaction\` DROP FOREIGN KEY \`loadId\`; 
    `);

    await queryRunner.query(`
      ALTER TABLE \`load\` DROP FOREIGN KEY \`carrierId\`;
    `);

    await queryRunner.query(`
      ALTER TABLE \`load\` DROP FOREIGN KEY \`factoringCompanyId\`;
    `);

    await queryRunner.query(`
      ALTER TABLE \`carrier\` DROP FOREIGN KEY \`factoringCompanyId\`;
    `);

    await queryRunner.query(`
      ALTER TABLE \`carrier\` DROP FOREIGN KEY \`paymentMethodId\`;
    `);

    await queryRunner.query(`
      ALTER TABLE \`user\` DROP FOREIGN KEY \`processingCarrierId\`; 
    `);

    await queryRunner.query(`
      ALTER TABLE \`payment_hold\` DROP FOREIGN KEY \`loadId\`; 
    `);

    await queryRunner.query(`
      ALTER TABLE \`payment_hold\` DROP FOREIGN KEY \`paymentHoldTypeId\`; 
    `);
  }
}
