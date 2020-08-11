<?php
include_once('model.speedtest.php');

$model = new speedtestModel();
$model->getResultsNotGeoCoded();
