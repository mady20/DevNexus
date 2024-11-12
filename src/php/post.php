<?php
// Include the database connection
include 'db.php';

// Get the post ID from the URL
$post_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Fetch the post
$sql = "SELECT * FROM blogs WHERE id = $post_id";
$result1 = $conn->query($sql);


// Close the database connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php
    $post = $result1->fetch_assoc();
    echo '<title>' . $post['title'] . '</title>'
    ?>

    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: black;
        }

        h1 {
            color: #0f0;
        }

        p {
            color: white;
        }
    </style>
</head>

<body>
    <?php
    // Check if the post exists
    if ($result1->num_rows > 0) {
        // $post = $result1->fetch_assoc();
        echo "<h1>Title: " . htmlspecialchars($post['title']) . "</h1>";
        echo "<p>Content: " . nl2br(htmlspecialchars($post['content'])) . "</p>";
    } else {
        echo "<p>Post not found.</p>";
    }

    ?>
</body>

</html>