import os
import sys
import json
import base64
import io
from http.server import HTTPServer, BaseHTTPRequestHandler
from PIL import Image

base_dir = r"C:\Users\DELL\.gemini\antigravity\scratch\crop_health_ml"
sys.path.insert(0, base_dir)

from src.inference.predict import CropHealthPredictor

predictor = CropHealthPredictor(base_dir, confidence_threshold=0.70)
print("CropHealthPredictor initialized with EfficientNet-B0 model!")

class MLRequestHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        if self.path == "/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "healthy", "model": "EfficientNet-B0", "classes": 28}).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        if self.path == "/predict":
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                body = json.loads(post_data.decode('utf-8'))
                image_data = body.get('image', '')
                
                # Strip base64 data header if present
                if ',' in image_data:
                    image_data = image_data.split(',')[1]
                    
                image_bytes = base64.b64decode(image_data)
                img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
                
                # Run prediction through EfficientNet-B0
                result = predictor.predict(img)
                
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps(result).encode())
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode())
        else:
            self.send_response(404)
            self.end_headers()

def run_server(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, MLRequestHandler)
    print(f"ML Model Inference API Server running on port {port}...")
    httpd.serve_forever()

if __name__ == "__main__":
    run_server(8000)
