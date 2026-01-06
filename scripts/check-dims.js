const fs = require('fs');
const path = require('path');

const files = ['menu_register.jpg', 'menu_default.jpg', 'menu_pending.jpg'];

files.forEach(file => {
    const filePath = path.resolve(__dirname, '../public/img/richmenu', file);
    if (!fs.existsSync(filePath)) {
        console.log(`${file}: Not found`);
        return;
    }
    const buf = fs.readFileSync(filePath);
    let found = false;
    for (let i = 0; i < buf.length - 1; i++) {
        if (buf[i] === 0xFF && buf[i + 1] === 0xC0) {
            const h = buf.readUInt16BE(i + 5);
            const w = buf.readUInt16BE(i + 7);
            console.log(`${file}: ${w}x${h}`);
            found = true;
            break;
        }
    }
    if (!found) console.log(`${file}: No SOF0 found`);
});
