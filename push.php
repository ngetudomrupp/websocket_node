<?php
$ch = curl_init();

// URL of your Node.js push endpoint
curl_setopt($ch, CURLOPT_URL, "https://demowebsocket.ecloudviews.com:3456/push?message=product_update&status=send");

// Important if your Node.js server returns JSON or text
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Optional timeout
curl_setopt($ch, CURLOPT_TIMEOUT, 3);

// Execute request
$response = curl_exec($ch);

// Check error
if (curl_errno($ch)) {
    echo "Error: " . curl_error($ch);
} else {
    echo "Pushed: " . $response;
}

curl_close($ch);
