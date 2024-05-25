let ws_scheme = window.location.protocol === "https:" ? "wss" : "ws";
let websocket = new WebSocket(`${ws_scheme}://site.provider.com/ws/your_path/`);

websocket.onopen = function(event) {
    console.log("WebSocket connection established.");
};

websocket.onmessage = function(event) {
    console.log("Message received:", event.data);
};

websocket.onclose = function(event) {
    console.log("WebSocket connection closed.");
};

websocket.onerror = function(event) {
    console.error("WebSocket error:", event);
};
