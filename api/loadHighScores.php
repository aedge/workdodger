<?php
include_once 'dbscore.class.php';

$response = [];
$gameid = '';
$score  = 0;
$gameid = $_GET['gameid'];

if(isset($_GET['score'])) {
    $score  = $_GET['score'];
}

if($gameid == "" || $gameid == 0){
	$response['success'] = false;
	$response['message'] = 'Invalid Game Id';
} else if($score != 0) {
    $dbscore = new dbscore();
    $isHighScore = false;
    $isHighScore = $dbscore->checkHighScore($gameid, $score);
    
    if($isHighScore) {
        
        $token = $dbscore->createHighScore($gameid, $score);
        $response['ishighscore'] = "yes";
        $response['highscoretoken'] = $token;
        $response['highscores'] = $dbscore->loadHighScores($gameid);
    }
} else {
    $dbscore = new dbscore();
    $response = $dbscore->loadHighScores($gameid);
}


$jsonResponse = json_encode($response);
print_r($jsonResponse);

?>