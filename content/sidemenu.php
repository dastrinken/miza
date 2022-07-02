<nav class="burger-menu">
    <div id="upperMenu">
        <ul>
            <li>
                <div class="progressOverlay"></div>
                <button type="button" class="btn button-stage1" onclick="loadingScreenTransition(1);"></button>
                Start
            </li>
            <li>
                <div class="progressOverlay"></div>
                <button type="button" class="btn button-stage2" onclick="loadingScreenTransition(2);"></button>
                Grundstudium
            </li>
            <li>
                <div class="progressOverlay"></div>
                <button type="button" class="btn button-stage3" onclick="loadingScreenTransition(3);"></button>
                Schwerpunktwahl
            </li>
            <li>
                <div class="progressOverlay"></div>
                <button type="button" class="btn button-stage4" onclick="loadingScreenTransition(4);"></button>
                Praxisphase
            </li>
            <li>
                <div class="progressOverlay"></div>
                <button type="button" class="btn button-stage5" onclick="loadingScreenTransition(5);"></button>
                Bachelor
            </li>
            <li>
                <div class="progressOverlay"></div>
                <button type="button" class="btn button-stage6" onclick="loadingScreenTransition(6);"></button>
                Credits
            </li>
        </ul>
    </div>
    <div id="lowerMenu">
        <!-- Button trigger qr-code modal -->
        <button type="button" class="btn btn-qr" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img src="./resources/icons/qr-code.svg" alt="Show QR-Code">
        </button>
        <a class="external-link" href="https://www.thm.de/site/studium/unsere-studienangebote/medieninformatik-bachelor-bsc-iem-friedberg.html" target="blank">Zur Website</a>
    </div>
    <script type="text/javascript">
        let address = document.location.toString();
        new QRCode(document.getElementById("qrcode"), {
            text: address,
            colorDark: "#4A5C66",
            colorLight: "#80BA24"
            }
        );
    </script>
</nav>