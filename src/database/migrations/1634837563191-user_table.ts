import { MigrationInterface, QueryRunner } from "typeorm";

export class userTable1634837563191 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, 
      \`name\` varchar(255) NOT NULL, 
      \`role\` varchar(255) NOT NULL, 
      \`processingCarrierId\` int NULL, 
      UNIQUE INDEX \`REL_8daccf683c47b9b84e8c645eb7\` 
      (\`processingCarrierId\`), 
      PRIMARY KEY (\`id\`))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("drop table `user`;");
  }
}
