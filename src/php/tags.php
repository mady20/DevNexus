<?php
// Include the database connection
include 'db.php';



$sql = "SELECT * FROM tags";
$result = $conn->query($sql);
$tags = [];
if ($result->num_rows > 0) {
    $tags = $result->fetch_all(MYSQLI_ASSOC);
}

$conn->close();
?>


<style>
    * {
        background-color: black;
    }

    .Headtags:hover {

        color: rgb(255, 0, 255);
        text-decoration: underline;
    }

    header {

        background-color: black;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        margin-left: 20px;
        margin-right: 40px;
        margin-bottom: 10px;
        font-size: 30px;
        font-weight: bold;
        color: rgb(0, 255, 0);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    }

    .nav-btn {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: bold;
        font-size: 15px;
        padding: 10px;
        border: none;
        background-color: rgb(0, 255, 0);
        border-radius: 10px;
        transition-duration: 0.35s;
    }

    .nav-btn:hover {
        background-color: rgb(255, 0, 255);
        color: white;
    }

    .search-bar {
        /* padding: 6.5px; */
        padding-left: 5px;
        padding-top: 6px;
        padding-bottom: 6px;
        padding-right: 10px;
        border-radius: 10px;
        border-style: none;
        font-size: 15px;
        color: white;
    }

    main {
        margin-right: 20px;
        margin-left: 70px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .tag {
        color: rgb(0, 255, 0);
        background-color: #1a1b20;
        ;
        height: 150px;
        width: 255px;
        border: 2px solid black;
        margin: 10px;
        border-radius: 5px;
        padding: 20px;
        border: 2px solid #1a1b20;
        transition-duration: .35s;
        font-family: 'Segoe UI';
        display: flex;

    }

    .tag:hover {
        border: 2px solid rgb(0, 255, 0);
    }

    a {
        color: inherit;
        background-color: inherit;
        text-decoration: none;
    }

    a:hover {
        color: rgb(255, 0, 255);
        text-decoration: underline;
    }
</style>



    <header>
        <h1 class="Headtags">Tags</h1>
        <div class="leftitems">
            <button class="nav-btn">Following Tags</button>
            <button class="nav-btn">Hidden Tags</button>
            <span class="searchbar">
                <input type="text" id="searchBox" class="search-bar" placeholder="Search for tag">
                <i class="fas fa-search search-icon"></i>
            </span>
        </div>
    </header>

    <main id="tagContainer">
        <?php if (!empty($tags)) : ?>
            <?php foreach ($tags as $tag) : ?>
                <div class="tag">
                    <h3><?php echo htmlspecialchars($tag['tagName']); ?></h3>
                    <p><?php echo htmlspecialchars($tag['description']); ?></p>
                </div>
            <?php endforeach; ?>
        <?php else : ?>
            <p>No tags found.</p>
        <?php endif; ?>
    </main>

    <script>
        const searchBox = document.getElementById('searchBox');
        const tagContainer = document.getElementById('tagContainer');
        const tags = tagContainer.getElementsByClassName('tag');

        searchBox.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            Array.from(tags).forEach(tag => {
                const tagText = tag.textContent.toLowerCase();
                tag.style.display = tagText.includes(query) ? 'inline-block' : 'none';
            });
        });
    </script>
</body>

</html>