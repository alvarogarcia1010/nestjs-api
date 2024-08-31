import { MigrationInterface, QueryRunner } from "typeorm";

// npm run migration:generate --name=create_base_tables
// // npm run migration:run
export class CreateBaseTables1724998354694 implements MigrationInterface {
    name = 'CreateBaseTables1724998354694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`name\` varchar(500) NOT NULL,
            \`email\` varchar(255) NOT NULL,
            \`password\` varchar(255) NOT NULL,
            \`organization_id\` int NOT NULL,
            \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            \`deleted_at\` timestamp(6) NULL,
            UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`),
            PRIMARY KEY (\`id\`)
        )`)

        await queryRunner.query(`CREATE TABLE \`confirmations\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`book_number\` int NULL,
            \`folio_number\` int NULL,
            \`record_number\` int NULL,
            \`date\` datetime NULL,
            \`name\` varchar(255) NOT NULL,
            \`gender\` enum ('M', 'F') NOT NULL,
            \`birth_date\` datetime NOT NULL,
            \`father_name\` varchar(255) NULL,
            \`mother_name\` varchar(255) NULL,
            \`godfather_name\` varchar(255) NULL,
            \`godmother_name\` varchar(255) NULL,
            \`organization_id\` int NOT NULL,
            \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            PRIMARY KEY (\`id\`)
        )`)

        await queryRunner.query(`CREATE TABLE \`baptisms\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`book_number\` int NULL,
            \`folio_number\` int NULL,
            \`record_number\` int NULL,
            \`date\` datetime NULL,
            \`name\` varchar(255) NOT NULL,
            \`gender\` enum ('M', 'F') NOT NULL,
            \`birth_date\` datetime NOT NULL,
            \`father_name\` varchar(255) NULL,
            \`mother_name\` varchar(255) NULL,
            \`godfather_name\` varchar(255) NULL,
            \`godmother_name\` varchar(255) NULL,
            \`celebrating_priest\` varchar(255) NOT NULL,
            \`organization_id\` int NOT NULL,
            \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            PRIMARY KEY (\`id\`)
        )`)

        await queryRunner.query(`CREATE TABLE \`marriages\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`date\` datetime NOT NULL,
            \`book_start\` int NULL,
            \`book_end\` int NULL,
            \`husband_name\` varchar(255) NOT NULL,
            \`husband_age\` int NOT NULL,
            \`husband_father\` varchar(255) NULL,
            \`husband_mother\` varchar(255) NULL,
            \`husband_birthplace\` varchar(255) NULL,
            \`husband_address\` varchar(255) NULL,
            \`wife_name\` varchar(255) NOT NULL,
            \`wife_age\` int NOT NULL,
            \`wife_father\` varchar(255) NULL,
            \`wife_mother\` varchar(255) NULL,
            \`wife_birthplace\` varchar(255) NULL,
            \`wife_address\` varchar(255) NULL,
            \`organization_id\` int NOT NULL,
            \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            PRIMARY KEY (\`id\`)
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`marriages\``);
        await queryRunner.query(`DROP TABLE \`baptisms\``);
        await queryRunner.query(`DROP TABLE \`confirmations\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }
}