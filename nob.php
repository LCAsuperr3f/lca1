<?php
// nob.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $content = $_POST['content'];
    echo "تم استلام المحتوى: " . htmlspecialchars($content);
} else {
    echo "الرجاء إرسال طلب POST";
}
?>
