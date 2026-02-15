<?php
namespace App\Controller\Api;

use App\Entity\Equipo;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TeamController extends AbstractController
{
    #[Route('/api/teams', name: 'api_teams', methods: ['GET'])]
    public function list(EntityManagerInterface $em): JsonResponse
    {
        $teams = $em->getRepository(Equipo::class)->findAll();
        $out = [];
        foreach ($teams as $t) {
            $out[] = [
                'id_equipo' => $t->getIdEquipo(),
                'nombre_equipo' => $t->getNombreEquipo(),
                'logo_equipo' => $t->getLogoEquipo(),
                'id_liga' => $t->getIdLiga(),
            ];
        }
        return new JsonResponse($out);
    }
}
