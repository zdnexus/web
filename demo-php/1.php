<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/12/21
 * Time: 20:02
 */
header("Content-Type: text/html;charset=utf-8");

function api($i)
{
    if ($i == 1) {
        $result = array('name' => 'neverMore', 'info' => '影魔');

        echo json_encode($result);

    } else if ($i == 2) {
        $result = array('name' => 'sven', 'info' => '流浪剑客');

        echo json_encode($result);
    }
}

$lastName = $_POST['name'];

api($lastName);