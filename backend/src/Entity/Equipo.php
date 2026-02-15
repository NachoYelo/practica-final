<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'equipos')]
class Equipo
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id_equipo = null;

    #[ORM\Column(type: 'string', length: 255)]
    private string $nombre_equipo;

    #[ORM\Column(type: 'string', length: 512, nullable: true)]
    private ?string $logo_equipo = null;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $id_liga = null;

    public function getIdEquipo(): ?int
    {
        return $this->id_equipo;
    }

    public function getNombreEquipo(): string
    {
        return $this->nombre_equipo;
    }

    public function setNombreEquipo(string $nombre): self
    {
        $this->nombre_equipo = $nombre;
        return $this;
    }

    public function getLogoEquipo(): ?string
    {
        return $this->logo_equipo;
    }

    public function setLogoEquipo(?string $logo): self
    {
        $this->logo_equipo = $logo;
        return $this;
    }

    public function getIdLiga(): ?int
    {
        return $this->id_liga;
    }

    public function setIdLiga(?int $id): self
    {
        $this->id_liga = $id;
        return $this;
    }
}
