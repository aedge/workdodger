<?php 
include_once 'db.class.php';

class dbscore
{
	protected $db;
	
	public function __construct(){
		$this->db = database::getInstance()->dbc;
	}	
	
	public function createHighScore($gameId, $score){
		
        $uniqid  = uniqid($gameId . $score);
        $hash    = md5($uniqid);
        $hash    = substr($hash, 0, 50);
        $sth     = $this->db->prepare("insert into highscore (gameid, score, hash, status) values (:gameid, :score, :hash, 'created');");
		$data    = array("gameid" => $gameId, "score" => $score, "hash" => $hash);
		$success = $sth->execute($data);
                
        if($success){
            return $hash;
        } else {
            return "ERROR";  
        }

	} 
    
    public function updateHighScore($gameId, $name, $score, $password) {
        $this->db->beginTransaction();
        try {
            $query = $this->db->prepare("update highscore set name = :name, status = 'updated' where gameid = :gameid and hash = :hash and status = 'created'");
            $query->execute(array("name" => $name, "gameid" => $gameId, "hash" => $password));

            $this->db->commit();

            return true;

        } catch (PDOException $e) {
              $this->db->rollback();
              return false;
        }
        
    }

	public function loadHighScores($gameId){
		$query = $this->db->prepare("select highscore.name, highscore.score from highscore where gameid = :gameid and status = 'updated' order by highscore.score desc limit 10");
		$query->execute(array('gameid' => $gameId));
		$results = $query->fetchAll(PDO::FETCH_ASSOC);	
		
		return $results;
	}
    
    public function checkHighScore($gameId, $score) {
        $query = $this->db->prepare("select count(*) from highscore where gameid = :gameid and score >= :score");
        $query->execute(array('gameid' => $gameId, 'score' => $score));
		$results = $query->fetchColumn();
        
        if($results < 10) {
            return true;
        } else {
            return false;
        }        
    }
    
}