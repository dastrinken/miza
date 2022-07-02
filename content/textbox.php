<div id="display" class="textbox">
    <p class="box-message"></p>
    <p id="text-arrow"><i class='bi-caret-down-fill'></i></p>
    <span id="clickBadge" class="position-absolute top-100 start-50 badge rounded-pill">
        <img src="./resources/images/misc/click.png" width="50">
    </span>
</div>

<div id="characterChoice" class="characterChoiceBox container">
    <div class="options">
        <!-- Barrierefreiheit? -->
        <?php
            for($i = 1; $i < 9; $i++) {
                $charBtn =  '<button id="char'.$i.'" type="text" class="btn choiceBtn">
                                <img id="playerChar'.$i.'" src="./resources/images/character/char'.$i.'.svg" alt="character '.$i.'">
                            </button>';
                echo $charBtn;
            }
        ?>
    </div>
</div>