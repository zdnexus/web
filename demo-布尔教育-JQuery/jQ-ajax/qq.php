<?php
/**
 * Created by PhpStorm.
 * User: hasee
 * Date: 2015/10/25
 * Time: 10:29
 */

header("Content-Type:text/html;charset=gb2312");

$username = $_GET["username"];
//$username = $_POST["username"];
if ($username == "ΊιΣ­Οι") {
    echo 1;
}
else if ($username == "ΦΣ¶«") {
    echo 2;
}
else{
    echo 0;
}