<!DOCTYPE html>
<html>

<body>
    <h1>Hello World.</h1>
    <script>
        let ws = new WebSocket("wss://demowebsocket.ecloudviews.com:8080");

        ws.onopen = () => {
            console.log("Connected to WebSocket");
        };

        ws.onerror = (err) => {
            console.log("❌ WebSocket connection error:", err);
        };

        ws.onmessage = (event) => {
            console.log("Server:", event.data);
        };
    </script>
</body>

</html>