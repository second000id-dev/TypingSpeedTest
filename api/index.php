<?php 
include 'db.php';
include 'header.php';
?>

<div class="container">
    <h2>Leaderboard (Top Scores)</h2>
    <table>
        <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>WPM</th>
            <th>Accuracy</th>
            <th>Date</th>
        </tr>
        <?php
        // Check if database connection is active before querying
        if ($conn && !$conn->connect_error) {
            $result = $conn->query("SELECT * FROM scores ORDER BY wpm DESC LIMIT 10");
            $rank = 1;
            if ($result && $result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo "<tr>
                        <td>{$rank}</td>
                        <td>{$row['username']}</td>
                        <td>{$row['wpm']}</td>
                        <td>{$row['accuracy']}%</td>
                        <td>{$row['test_date']}</td>
                    </tr>";
                    $rank++;
                }
            } else {
                echo "<tr><td colspan='5'>No records found yet.</td></tr>";
            }
        } else {
            echo "<tr><td colspan='5'>Leaderboard is currently unavailable (Database disabled on serverless).</td></tr>";
        }
        ?>
    </table>
</div>

<?php include 'footer.php'; ?>
