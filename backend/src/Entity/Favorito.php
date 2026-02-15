<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'favoritos')]
class Favorito
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false, name: 'user_id', referencedColumnName: 'id', onDelete: 'CASCADE')]
    private User $user;

    #[ORM\ManyToOne(targetEntity: Equipo::class)]
    #[ORM\JoinColumn(nullable: false, name: 'equipo_id', referencedColumnName: 'id_equipo', onDelete: 'CASCADE')]
    private Equipo $equipo;

    #[ORM\Column(type: 'datetime')]
    private \DateTimeInterface $created_at;

    public function __construct()
    {
        $this->created_at = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;
        return $this;
    }

    public function getEquipo(): Equipo
    {
        return $this->equipo;
    }

    public function setEquipo(Equipo $equipo): self
    {
        $this->equipo = $equipo;
        return $this;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->created_at;
    }
}
