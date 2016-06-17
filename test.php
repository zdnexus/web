<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/12/23
 * Time: 16:14
 */
header("Content-Type: text/html;charset=utf-8");

function api($index)
{
    if ($index == 1) {
        echo json_encode(array('statusCode' => 0, 'data' => 'Next'));
    } else if ($index == 2) {
        echo json_encode(array('statusCode' => 0, 'data' => 'Nexus'));
    } else if ($index == 3) {
        echo json_encode(array('statusCode' => 0, 'data' => 'Noa!'));
    } else {
        echo json_encode(array('statusCode' => 1, 'data' => 'ErrorSystem'));
    }
}

$value = $_POST['id'];

api($value);