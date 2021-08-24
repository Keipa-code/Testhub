<?php

declare(strict_types=1);


namespace App\Service;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\Address;

class TemplatedEmailFactory
{
    CONST EMAIL_FROM = 'bot@app.test';
    CONST NAME_FROM = 'mailer bot';
    CONST SUBJECT = 'Please Confirm your Email';
    CONST HTML_TEMPLATE = 'registration/confirmation_email.html.twig';

    public static function create($userEmail): TemplatedEmail
    {
        return (new TemplatedEmail())
            ->from(new Address(self::EMAIL_FROM, self::NAME_FROM))
            ->to($userEmail)
            ->subject(self::SUBJECT)
            ->htmlTemplate(self::HTML_TEMPLATE);
    }
}