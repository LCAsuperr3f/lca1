<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $text = $_POST['text'];  // أخذ النص من الفورم

    // تحديد مكان حفظ الملف النصي على الخادم
    $file = "saved_text.txt";

    // كتابة النص في الملف
    file_put_contents($file, $text . PHP_EOL, FILE_APPEND);

    echo "تم حفظ النص في الملف!";
}
?>

<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>حفظ النص في ملف نصي</title>
</head>
<body>
    <h1>أدخل النص هنا لحفظه في ملف على الخادم</h1>
    <form method="POST" action="nob.php">
        <textarea name="text" rows="10" cols="50" placeholder="أدخل النص هنا"></textarea><br><br>
        <button type="submit">حفظ النص في الملف</button>
    </form>
</body>
</html>
