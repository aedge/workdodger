<?php
include_once 'dbscore.class.php';

$data = json_decode(file_get_contents("php://input"));
$response = [];

if($data->gameid == "" || $data->gameid == 0){
	$response['success'] = false;
	$response['message'] = 'Invalid User Id';
}
if($data->name == "" || $data->name == null){
	$response['success'] = false;
	$response['message'] = 'Invalid name';
}
if($data->score == "" || $data->score == null){
	$response['success'] = false;
	$response['message'] = 'Invalid score';
}
if($data->token == "" || $data->token == null){
	$response['success'] = false;
	$response['message'] = 'Could not save token';
}

$dbscore = new dbscore();
$success = $dbscore->updateHighScore($data->gameid, $data->name, $data->score, $data->token);

if($success){
	$response['success'] = true;
	$response['message'] = '';
} else {
	$response['success'] = false;
	$response['message'] = 'Could not save prediction';
}

$jsonResponse = json_encode($response);
print_r($jsonResponse);

?>