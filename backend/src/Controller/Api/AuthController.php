<?php
namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        if (!$username || !$password) {
            return new JsonResponse(['error' => 'username and password required'], 400);
        }

        $existing = $em->getRepository(User::class)->findOneBy(['username' => $username]);
        if ($existing) {
            return new JsonResponse(['error' => 'username already exists'], 400);
        }

        $user = new User();
        $user->setUsername($username);
        $user->setPasswordHash(password_hash($password, PASSWORD_DEFAULT));
        $token = bin2hex(random_bytes(16));
        $user->setToken($token);

        $em->persist($user);
        $em->flush();

        return new JsonResponse(['token' => $token]);
    }

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        if (!$username || !$password) {
            return new JsonResponse(['error' => 'username and password required'], 400);
        }

        $user = $em->getRepository(User::class)->findOneBy(['username' => $username]);
        if (!$user) {
            return new JsonResponse(['error' => 'invalid credentials'], 401);
        }

        if (!password_verify($password, $user->getPasswordHash())) {
            return new JsonResponse(['error' => 'invalid credentials'], 401);
        }

        if (!$user->getToken()) {
            $user->setToken(bin2hex(random_bytes(16)));
            $em->flush();
        }

        return new JsonResponse(['token' => $user->getToken()]);
    }
}
