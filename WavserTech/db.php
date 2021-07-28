<?php  
if (isset($_POST['submit'])) {  
    extract($_POST);  
    $servername = "localhost ";  
    $username   = "root";  
    $password   = "";  
    $dbname     = "wavser";  
    // Create connection  
    $conn = new mysqli($localhost, $username, $password, $dbname);  
    // Check connection  
    if ($conn->connect_error) {  
        die("Connection failed: " . $conn->connect_error);  
    }  
    $sql = "INSERT INTO `user` (fname,lname,uname,email,tel)  
  
VALUES ('$fname','$lname','$uname','$email','$tel')";  
    if ($conn->query($sql) === TRUE) {  
        header('Location: index.html');  
    } else {  
        echo "Error: " . $sql . "<br>" . $conn->error;  
    }  
    $conn->close();  
}  
?> 