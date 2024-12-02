import {MigrationInterface, QueryRunner} from "typeorm";

export class tagColumn1733157051677 implements MigrationInterface {
    name = 'tagColumn1733157051677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "tag" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "tag"`);
    }

}
