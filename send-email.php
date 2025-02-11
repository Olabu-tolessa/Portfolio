<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$firstName = $_POST["first-name"];
$lastName = $_POST["last-name"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$subject = $_POST["subject"];
$message = $_POST["message"];

require "vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->SMTPAuth = true;

    $mail->Host = "smtp.gmail.com";
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->Username = "owalabutole@gmail.com";
    $mail->Password = "jovk gduv hwat vukt";

    $mail->setFrom($email, "$firstName $lastName");
    $mail->addAddress("owalabutole@gmail.com", "Owalabu Tolessa");

    $mail->Subject = $subject;
    $mail->Body = "You have received a new message from:\n\n"
                . "Name: $firstName $lastName\n"
                . "Email: $email\n"
                . "Phone: $phone\n"
                . "Subject: $subject\n"
                . "Message: $message";

    $mail->send();
    echo "Message sent successfully!";
    //header("Location: index.html");
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}