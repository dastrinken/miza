<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
    <!-- CSS -->
    <link rel="stylesheet" href="./styles/main.css">
    <!-- GSAP -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/MotionPathPlugin.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/ScrollTrigger.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/Draggable.min.js"></script>
    <!-- jQuery -->
    <script src="./scripts/jquery.js"></script>
    <!-- qrcodejs -->
    <script src="./scripts/qrcode.min.js"></script>

    <title>Medieninformatik zum Anfassen</title>
</head>
<body>
    <div id="wrapper" class="w-100 h-100">
        <div id="loader-wrapper" class="d-flex flex-column justify-content-center align-items-center">
            <div id="loader"></div>
            <h3 id="loader-message">
                <!-- default message -->
                Seite wird geladen...
            </h3>
        </div>
        
        <section id="mainContent" class="container d-flex justify-content-center flex-column">
            <!-- here be dragons -->
        </section>
    </div>

    <!-- qr-code modal -->
    <?php
        include(__DIR__."/content/qrcode.html");
    ?>
    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="./scripts/main.js"></script>
</body>
</html>