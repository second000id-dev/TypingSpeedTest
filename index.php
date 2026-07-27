<?php 
include 'db.php';
include 'header.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST['username']);
    $wpm = intval($_POST['wpm']);
    $accuracy = floatval($_POST['accuracy']);

    $stmt = $conn->prepare("INSERT INTO scores (username, wpm, accuracy) VALUES (?, ?, ?)");
    $stmt->bind_param("sid", $username, $wpm, $accuracy);
    $stmt->execute();
    $stmt->close();
    
    echo "<p style='color:green;'>Score saved successfully!</p>";
}
?>

<div class="container">
    <h2>Typing Speed Test</h2>
    <div class="quote-box" id="quote"></div>
    <textarea id="input-field" placeholder="Start typing here..."></textarea>
    
    <div class="stats">
        <p>Time Left: <span id="timer">30</span>s</p>
        <p>WPM: <span id="wpm">0</span></p>
        <p>Accuracy: <span id="accuracy">100%</span></p>
    </div>

    <button id="restart-btn">Restart Test</button>

    <form id="score-form" method="POST" style="display:none; margin-top:20px;">
        <h3>Save Your Score</h3>
        <input type="text" name="username" placeholder="Enter your name" required style="padding:5px; margin-right:5px;">
        <input type="hidden" name="wpm" id="hidden-wpm">
        <input type="hidden" name="accuracy" id="hidden-accuracy">
        <button type="submit">Save Score</button>
    </form>
</div>

<?php include 'footer.php'; ?>