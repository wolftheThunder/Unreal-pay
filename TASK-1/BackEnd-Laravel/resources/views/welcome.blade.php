<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wrong Place</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet">
    <style>
        body {
            background-color: #282c34;
            color: #fff;
            font-family: 'Roboto Mono', monospace;
            text-align: center;
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        h1 {
            font-size: 3rem;
            color: #f39c12;
            animation: fadeIn 3s ease-in-out;
        }

        .emoji {
            font-size: 3rem;
        }

        .message {
            font-size: 1.5rem;
            margin-top: 20px;
            color: #e74c3c;
        }

        .error {
            color: #e74c3c;
            font-size: 2rem;
            animation: shake 0.5s ease-in-out infinite;
        }

        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }

        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            50% { transform: translateX(10px); }
            75% { transform: translateX(-10px); }
            100% { transform: translateX(0); }
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 30px;
            background-color: #3498db;
            color: white;
            text-decoration: none;
            font-size: 1.2rem;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        .button:hover {
            background-color: #2980b9;
        }
    </style>
</head>
<body>

    <div>
        <h1>Your is wrong place 🚫</h1>
        <div class="emoji">🤖 🔴 🚀</div>
        <p class="message">This site is for APIs only.</p>
        <p class="error">❌ Something went wrong ❌</p>
        <a href="/" class="button">Back to Home</a>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Welcome to the wrong place!');
        });
    </script>

</body>
</html>
