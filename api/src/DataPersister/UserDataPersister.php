<?php

declare(strict_types=1);

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class UserDataPersister implements ContextAwareDataPersisterInterface
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $hasher;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $hasher
    ) {
        $this->entityManager = $entityManager;
        $this->hasher = $hasher;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof User;
    }

    /**
     * @param User $data
     */
    public function persist($data, array $context = []): void
    {
        if ($data->getPlainPassword()) {
            $data->setPassword(
                $this->hasher->hashPassword($data, $data->getPlainPassword())
            );
            $data->eraseCredentials();
        }

        if ($data->getNewEmail()) {

        }

        $this->entityManager->persist($data);
        $this->entityManager->flush();
    }

    public function remove($data, array $context = []): void
    {
        $this->entityManager->remove($data);
        $this->entityManager->flush();
    }
}