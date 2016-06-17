<?php

header("Content-Type:text/html;charset=gb2312");

$username = $_POST["username"];
if ($username == "admin") {
    echo "用户名不能是admin";
} else {
    echo "用户名可以注册";
}