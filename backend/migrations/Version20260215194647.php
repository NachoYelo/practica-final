<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260215194647 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE equipos (id_equipo INT AUTO_INCREMENT NOT NULL, nombre_equipo VARCHAR(255) NOT NULL, logo_equipo VARCHAR(512) DEFAULT NULL, id_liga INT DEFAULT NULL, PRIMARY KEY (id_equipo)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE users (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(100) NOT NULL, password_hash VARCHAR(255) NOT NULL, token VARCHAR(64) DEFAULT NULL, created_at DATETIME NOT NULL, UNIQUE INDEX UNIQ_1483A5E9F85E0677 (username), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE equipos');
        $this->addSql('DROP TABLE users');
    }
}
