<?php
include_once('../app/model.speedtest.php');

$survey = $_POST;

$model = new speedtestModel();

$model->saveResults( $survey );

header('Content-Type: application/json');
echo json_encode([]);