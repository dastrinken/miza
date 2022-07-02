<!-- logo css -->
<link rel="stylesheet" href="./styles/thm_logo.css">
<!--
        <div id="animControls">
            <button id="playBtn" type="button" class="btn m-3" style="background-color: var(--thm_green);">Restart</button>
            <button id="pauseBtn" type="button" class="btn m-3" style="background-color: var(--thm_grey);">Play/Pause</button>
            <button id="reverseBtn" type="button" class="btn btn-danger m-3">Reverse</button>
        </div>
-->
<div id="logo-wrapper">
    <div id="thm-logo">
        <div id="squares-container">
                <!-- squares -->
                <?php 
                    for($i = 0; $i < 7; $i++) {
                        $square_row = "<div class='thm-row'>";
                        for($j = 0; $j < 6; $j++) {
                            $square_row .= "<div class='thm-col'>";
                            if($i % 2 == 0 && $j % 2 == 0) {
                                if($i == 0 && $j == 0) {
                                    $square_row .= "<div class='thm-square-empty'></div>";
                                } else {
                                    $square_row .= "<div class='thm-square'></div>";
                                }
                            }
                            $square_row .= "</div>";
                        }
                        $square_row .= "</div>";
                        echo $square_row;
                    }
                ?>
        </div>
        <div id="letters-container">
            <img src="./resources/images/logo/T.png" class="thm-lettering">
            <img src="./resources/images/logo/H.png" class="thm-lettering">
            <img src="./resources/images/logo/M.png" class="thm-lettering">
        </div>
        <div id="subheading-container">
            <img id="thm-subheading" src="./resources/images/logo/subheading.png">
        </div>
    </div>
</div>

<!-- Scripts -->
<script src="./scripts/thm_logo.js"></script>