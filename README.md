# RD-320

Robot Framework TestScript Generation for UI Testing

## Requirements
NodeJs
JDK17 hoặc mới hơn
Python
Pyeda
[ChromeDriver](https://chromedriver.chromium.org/) cùng phiên bản với GoogleChrome:
- Windows: Thêm đường dẫn tới thư mục chứa file executable vào biến môi trường `PATH`
- MacOS: Đặt file executable vào thư mục `/usr/local/bin`

## Installation

1. Clone project FrontEnd và cài node modules bằng câu lệnh

```bash
   npm install
```
2. Khởi chạy project FrontEnd và truy cập tới đường dẫn [localhost](http://localhost:5173/)

```bash
  npm run dev
```

3. Khởi chạy project [SpringbootUITestingForm](https://github.com/atsayu/SpringbootUITestingForm)
4. Khởi chạy project [LocatorDetector](https://github.com/atsayu/TSDV_UITesting)
5. Mở terminal tại thư mục và chạy file `tb_server.py`
```bash
  python tb_server
```
