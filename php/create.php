<?php
    require_once('../config/mysql_connect.php');

    $date = $_POST['date'];
    $description = $_POST['description'];
    $amount = $_POST['amount'];
    $output = [
        'success' => false,
        'error' => [],
        'id' => null
    ];
    
    $query = "INSERT INTO `list` SET `date`='$date', `description`='$description', `amount`='$amount'";
    $result = mysqli_query($conn, $query);
    //print($result);

    if(!empty($result)){
        if(mysqli_affected_rows($conn)){
            $output['success'] = true;
            $output['id'] = mysqli_insert_id($conn);
        } else {
            $output['errors'][] = 'unable to insert data';
        }
    } else {
        $output['errors'][] = 'invalid query';
    }

    $json_output = json_encode($output);

    print($json_output);

?>