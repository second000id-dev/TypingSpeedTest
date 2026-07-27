<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "typing_test_db";

// Suppress connection errors on serverless Vercel environment
@$conn = new mysqli($host, $user, $password, $database);
?>
