import { MigrationInterface, QueryRunner } from "typeorm";

export class collectionBoardTable1634831319249 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`collection_board\` 
      (\`id\` int NOT NULL AUTO_INCREMENT, 
      \`carrierBalance\` int NOT NULL, 
      \`date\` datetime NOT NULL, 
      \`displayId\` varchar(255) NOT NULL, 
      \`carrierId\` int NULL, PRIMARY KEY (\`id\`));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop table `collection_board`;");
  }
}
