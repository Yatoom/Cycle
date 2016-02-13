<!DOCTYPE html>
<head>
<meta charset="utf-8">
<script src="js/jquery-2.0.3.min.js"></script>
<link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css">
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
<script src="util/game.js"></script>
<link href="css/main.css" rel="stylesheet" type="text/css">
<link href="css/items.css" rel="stylesheet" type="text/css">
<link href="css/animation.css" rel="stylesheet" type="text/css">
<script src="util/sounds.js"></script>
</head>
<body>
<div class="debug draggable">
    <h3>Debug tools</h3>
    <h4>Location</h4>
    <select id="newlevel">
    <?
      $levels = scandir (__DIR__ . "/levels/");
      foreach ($levels as $level) {
        if(strpos($level, ".html") !== FALSE) {
          $level = substr($level, 0, strpos($level, ".html"));
          echo "<option value='$level'>$level</option>";
        }
      }
    ?>
    </select>
    <input type="submit" value="Teleport" onclick="goToLevel($('#newlevel').val())">

<!--     <form action="#">
      <input type="text" name="itemname" id="itemname" placeholder="Item Name">
      <input type="button" id='additem' name='additem' value="Add item">
    </form> -->
    <h4>Fields</h4>
    <input type="submit" id='addborders' name='addborders' value="Show fields">
    <input type="submit" value="Add new field" onclick="addField()">

    <h4>Field data</h4>
    <textarea id='field-data' style="height: 80px"></textarea>

    <h4>Reset</h4>
    <input type="submit" onclick="reset()" value="Reset game">
     <input type="submit" onclick="muteAll()" value="Mute Sound">


</div>
<div class="header">
    <img class="logo" src="img/logo-small.png">
    <input type="submit" id='loggout' name='loggout' value="Log out">
</div>

<div class="container">
    <div class="game"></div>
    <div id = 'inventory'>
        <table id = 'invtable'>
        </table>
    </div>
    <div id="log"></div>
</div>

<div class="footer">
  A project by Kevin Cleijne, Jeroen van Hoof, Joep KT, Twan van Schijndel, and Guus van der Weerd.
</div>


</body>
