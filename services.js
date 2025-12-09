//-- local config
// const http = require("http");
// const WebSocket = require("ws");

// const wss = new WebSocket.Server({ port: 8080 });

// function broadcast(msg) {
//     wss.clients.forEach(client => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify({ event: msg }));
//         }
//     });
// }

// const api = http.createServer((req, res) => {
//     if (req.url.startsWith("/push")) {
//         const url = new URL(req.url, `http://${req.headers.host}`);
//         const msg = url.searchParams.get("message");
//         const status = url.searchParams.get("status");
//         const path = url.pathname;

//         broadcast(msg + " - " + status);
//         res.end("OK");
//     }
// });

// api.listen(3456, () => console.log("Push API running on http://localhost:3456"));

const fs = require("fs");
const https = require("https");
const http = require("http");
const WebSocket = require("ws");

// -------------------------
// 1. HTTPS CERTIFICATES
// -------------------------

const options = {
    key: fs.readFileSync("/etc/letsencrypt/live/demowebsocket.ecloudviews.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/demowebsocket.ecloudviews.com/fullchain.pem")
};

// -------------------------
// 2. CREATE HTTPS SERVER (WSS)
// -------------------------

const httpsServer = https.createServer(options);
const wss = new WebSocket.Server({ server: httpsServer });

// -------------------------
// 3. BROADCAST FUNCTION
// -------------------------
function broadcast(msg) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ event: msg }));
        }
    });
}

// -------------------------
// 4. PUSH API (PORT 3456)
// PHP calls THIS URL
// -------------------------
const api = http.createServer((req, res) => {
    if (req.url.startsWith("/push")) {
        const url = new URL(req.url, `http://${req.headers.host}`);

        const msg = url.searchParams.get("message");
        const status = url.searchParams.get("status");

        broadcast(`${msg} - ${status}`);
        res.end("OK");
    }
});

// -------------------------
// 5. START SERVERS
// -------------------------

// WSS Server (Secure WebSocket)
httpsServer.listen(8080, () => {
    console.log("WSS WebSocket server running on https://demowebsocket.ecloudviews.com:8080");
});

// HTTP Push API
api.listen(3456, () => {
    console.log("Push API running on http://localhost:3456");
});
