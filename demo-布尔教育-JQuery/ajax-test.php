<?php
/**
 * Created by PhpStorm.
 * User: hasee
 * Date: 2015/10/25
 * Time: 9:24
 */

header("Content-Type:text/html;charset=gb2312");

$username = $_GET["username"];
//$username = $_POST["username"];

if ($username == "admin") {
    echo false;
}
else {
    echo true;
}