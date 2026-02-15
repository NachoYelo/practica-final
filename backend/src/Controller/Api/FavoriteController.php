<?php
namespace App\Controller\Api;

use App\Entity\Favorito;
use App\Entity\User;
use App\Entity\Equipo;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class FavoriteController extends AbstractController
{
    private function getUserFromRequest(Request $request, EntityManagerInterface $em): ?User
    {
        $auth = $request->headers->get('Authorization') ?: $request->get('token');
        if (!$auth) return null;
        if (strpos($auth, 'Bearer ') === 0) $auth = substr($auth, 7);
        return $em->getRepository(User::class)->findOneBy(['token' => $auth]);
    }

    #[Route('/api/favorites', name: 'api_favorites_get', methods: ['GET'])]
    public function list(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUserFromRequest($request, $em);
        if (!$user) return new JsonResponse(['error' => 'unauthorized'], 401);

        $repo = $em->getRepository(Favorito::class);
        $favs = $repo->findBy(['user' => $user]);
        $out = [];
        foreach ($favs as $f) {
            $eq = $f->getEquipo();
            $out[] = [
                'id' => $f->getId(),
                'equipo' => [
                    'id_equipo' => $eq->getIdEquipo(),
                    'nombre_equipo' => $eq->getNombreEquipo(),
                    'logo_equipo' => $eq->getLogoEquipo(),
                ],
                'created_at' => $f->getCreatedAt()->format(DATE_ATOM),
            ];
        }
        return new JsonResponse($out);
    }

    #[Route('/api/favorites', name: 'api_favorites_add', methods: ['POST'])]
    public function add(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUserFromRequest($request, $em);
        if (!$user) return new JsonResponse(['error' => 'unauthorized'], 401);

        $data = json_decode($request->getContent(), true);
        $idEquipo = $data['id_equipo'] ?? null;
        if (!$idEquipo) return new JsonResponse(['error' => 'id_equipo required'], 400);

        $equipo = $em->getRepository(Equipo::class)->find($idEquipo);
        if (!$equipo) return new JsonResponse(['error' => 'equipo not found'], 404);

        // prevent duplicates
        $existing = $em->getRepository(Favorito::class)->findOneBy(['user' => $user, 'equipo' => $equipo]);
        if ($existing) return new JsonResponse(['ok' => true, 'id' => $existing->getId()]);

        $fav = new Favorito();
        $fav->setUser($user);
        $fav->setEquipo($equipo);

        $em->persist($fav);
        $em->flush();

        return new JsonResponse(['ok' => true, 'id' => $fav->getId()]);
    }

    #[Route('/api/favorites/{id}', name: 'api_favorites_delete', methods: ['DELETE'])]
    public function delete(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUserFromRequest($request, $em);
        if (!$user) return new JsonResponse(['error' => 'unauthorized'], 401);

        $fav = $em->getRepository(Favorito::class)->find($id);
        if (!$fav) return new JsonResponse(['error' => 'not found'], 404);
        if ($fav->getUser()->getId() !== $user->getId()) return new JsonResponse(['error' => 'forbidden'], 403);

        $em->remove($fav);
        $em->flush();
        return new JsonResponse(['ok' => true]);
    }
}
