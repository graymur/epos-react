<?php
$info = include './api/modules/meta.php';
$language = preg_split('#/#', $_SERVER['REQUEST_URI'], 0, PREG_SPLIT_NO_EMPTY);

$language = !@in_array($language[0], array('en', 'si')) ? 'en' : $language[0];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Epos Slovenia</title>
    <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" media="screen" href="/css/main.css?5221">
</head>
<body>
<div class="container" id="root" ></div>
<script>
    var __INITIAL_STATE__ = {
        meta: <?=json_encode(getMeta($language))?>
    }
</script>
<script src="/js/main.js"></script>
</body>
</html>

