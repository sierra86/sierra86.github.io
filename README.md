<!DOCTYPE html>
<html lang="">
<head>
    <meta charset="utf-8">
    <title>Sierra86</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0; /* Set your desired background color */
            perspective: 1000px; /* Adjust the perspective value as needed */
        }

        #sierra86-container {
            display: flex;
            align-items: center;
            position: relative;
        }

        #sierra86-text {
            font-size: 3rem; /* Adjust the font size as needed */
            font-weight: bold;
            text-transform: uppercase;
            text-align: center;
            text-transform: uppercase;
            color: #333; /* Set your desired text color */
            padding: 0 50px; /* Add padding to the text */
            transform-style: preserve-3d;
            transform: perspective(400px) rotateX(15deg); /* Apply a 15-degree tilt effect */
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2); /* Add shadow to simulate tilt */
        }

        .cube-container {
            display: flex;
            align-items: flex-start;
            margin-top: 30px; /* Adjust the vertical margin as needed */
        }

        .cube {
            position: relative;
            width: 100px; /* Adjust the cube size as needed */
            height: 100px; /* Adjust the cube size as needed */
            transform-style: preserve-3d;
            animation: rotateCube 10s linear infinite;
        }

        .face {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: transparent;
            border: 1px solid rgba(0, 0, 0, 0.2); /* Set a border with a bit of opacity */
            box-sizing: border-box;
            animation: changeColor 10s linear infinite;
        }

        .cube .face:nth-child(1) {
            transform: rotateY(0deg) translateZ(50px);
        }

        .cube .face:nth-child(2) {
            transform: rotateY(90deg) translateZ(50px);
        }

        .cube .face:nth-child(3) {
            transform: rotateY(180deg) translateZ(50px);
        }

        .cube .face:nth-child(4) {
            transform: rotateY(-90deg) translateZ(50px);
        }

        .cube .face:nth-child(5) {
            transform: rotateX(90deg) translateZ(50px);
        }

        .cube .face:nth-child(6) {
            transform: rotateX(-90deg) translateZ(50px);
        }

        #cube-left {
            margin-right: 50px; /* Adjust the distance from the text */
        }

        #cube-right {
            margin-left: 50px; /* Adjust the distance from the text */
        }

        @keyframes rotateCube {
            0% {
                transform: rotateY(0deg);
            }

            100% {
                transform: rotateY(360deg);
            }
        }

        @keyframes changeColor {
            0% {
                background-color: rgba(255, 0, 0, 0.4); /* Set your initial pastel hue color with opacity */
            }

            25% {
                background-color: rgba(0, 255, 0, 0.4); /* Set a different pastel hue color with opacity */
            }

            50% {
                background-color: rgba(0, 0, 255, 0.4); /* Set another pastel hue color with opacity */
            }

            75% {
                background-color: rgba(255, 255, 0, 0.4); /* Set yet another pastel hue color with opacity */
            }

            100% {
                background-color: rgba(255, 0, 255, 0.4); /* Set the final pastel hue color with opacity */
            }
        }
    </style>
</head>
<body>
    <div id="sierra86-container">
        <div id="cube-left" class="cube-container">
            <div class="cube">
                <div class="face"></div>
                <div class="face"></div>
                <div class="face"></div>
                <div class="face"></div>
                <div class="face"></div>
                <div class="face"></div>
            </div>
        </div>
        <div id="sierra86-text">Sierra86</div>
        <div id="cube-right" class="cube-container">
            <div class="cube">
                <div class="face"></div>
                <div class="face"></div>
                <div class="face"></div>
                <div class="face"></div>
                <div class="face"></div>
                <div class="face"></div>
            </div>
        </div>
    </div>
</body>
</html>
