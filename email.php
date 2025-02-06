<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['first-name'];
    $lastName = $_POST['last-name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $to = "your-email@example.com";
    $emailSubject = "New message from $firstName $lastName";
    $emailBody = "
        Name: $firstName $lastName\n
        Email: $email\n
        Phone: $phone\n
        Subject: $subject\n\n
        Message:\n$message
    ";
    $headers = "From: $email";

    if (mail($to, $emailSubject, $emailBody, $headers)) {
        echo "<script>alert('Thank you! Your message has been sent.'); window.location = 'index.html';</script>";
    } else {
        echo "<script>alert('Oops! Something went wrong, please try again later.'); window.location = 'index.html';</script>";
    }
}
?>
