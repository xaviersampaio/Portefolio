<?php 
//definition variable
define('USERS_FILE', '/var/users.txt');
define('LOG_FILE', '/var/logs.txt');

//recuperarion des donnes
$name = $_POST["name"];
$passwd1 = $_POST["passwd1"];
$passwd2 = $_POST["passwd2"];

//validation du nom d'utilisateur 
if (!preg_match('/^[a-zA-Z0-9\-]+$/', $nom)) {
    header('Location: index.php?error=nom');
};

// si l'utilisateur existe
foreach ($users as $user) {
    $parts = explode(':', $user);
    if ($parts[0] === $nom) {
        header('Location: index.php?error=user_exists');
        break;
    }
}

// mot de passe identique
if ($passwd1 !== $passwd2) {
    header('Location: index.php?error=password_match');
    exit();
};

//mot de passe robuste (8 à 72 caractère)
if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,72}$/', $passwd1)) {
    header('Location: index.php?error=password_weak');
    exit();
};

// creation des fichiers manquant
if (!file_exists(USERS_FILE)) {
    file_put_contents(USERS_FILE, '');
    chmod(USERS_FILE, 0600); 
}; 
if ( file_exists(LOG_FILE)) {
    file_put_contents(LOG_FILE,'');
};

// Hash + écriture
$password = password_hash($passwd1, PASSWORD_BCRYPT);
$ligne = $nom . ':' . $password . PHP_EOL;
file_put_contents(USERS_FILE, $ligne, FILE_APPEND | LOCK_EX);

//log 
date_default_timezone_set('Europe/Paris');
$date = date('d/m/Y H:i:s');
$log = '[' . $date . '] Création compte : ' . $nom . PHP_EOL;
file_put_contents(LOG_FILE, $log, FILE_APPEND | LOCK_EX);

header('Location: index.php?success=1');
exit();

?>