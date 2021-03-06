<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\Network;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class NetworkFixtures extends Fixture
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setUsername('NetworkUser');
        $user->setPassword($this->hasher->hashPassword($user, '12345678'));

        $network = new Network();
        $network->setName('mail.ru');
        $network->setIdentity('identity identification');

        $user->addNetwork($network);

        $manager->persist($network);
        $manager->persist($user);

        $manager->flush();
    }
}
