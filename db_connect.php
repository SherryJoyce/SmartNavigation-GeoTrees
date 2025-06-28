<?php   //Starter PHP coding

$host = 'localhost';  // sambungan ke database
$user = 'root';       // Nama pengguna database (kalau localhost pakai root)
$password = '';       // password '' maksudnya tiada
$dbname = 'geotrees'; // Nama pangkalan data yang ingin dihubungkan

// sambungan ke MySQL menggunakan mysqli
$conn = new mysqli($host, $user, $password, $dbname);

// Semak jika sambungan gagal
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);  // Tamat skrip 
}
?>
