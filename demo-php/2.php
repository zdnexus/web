<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/12/23
 * Time: 14:11
 */

header("Content-Type: text/html;charset=utf-8");

$result = array('1' => 'Next', '2' => 'Nexus', '3' => 'Red', '4' => 'Blue', '5' => 'NoA');

echo json_encode($result);