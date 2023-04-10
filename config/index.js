const NodeRSA = require('node-rsa')
var fs = require('fs');

const config = {
    server: {
        ip: "127.0.0.1",
        port: 3333
    },
    db_dev: {
        database: 'ymj_blog_m',
        username: 'root',
        password: 'ymj520...',
        host: '127.0.0.1', // ip
        dialect: 'mysql', // 数据库
        port: 3309, // 端口
    },
    db_pro: {
        database: 'ymj_blog_m',
        username: 'root',
        password: '123456',
        host: '101.43.112.38', // ip
        dialect: 'mysql', // 数据库
        port: 3310, // 端口
    },
    // 定义允许跨域的origin
    allowOrigins: ['https://ymj.ink', 'http://127.0.0.1:3333'],
    // 延迟
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    },
    // 加密
    encrypt(data) {
        const key = new NodeRSA({ b: 512 });
        const publicKey = fs.readFileSync('publicKey.txt', 'utf-8');
        key.importKey(publicKey, 'pkcs8-public');
        const encrypted = key.encrypt(data, 'base64')

        return encrypted
    },
    // 解密 
    decrypt(data) {
        const key = new NodeRSA({ b: 512 });
        const privateKey = fs.readFileSync('privateKey.txt', 'utf-8');
        key.importKey(privateKey, 'pkcs8-private');
        const decrypted = key.decrypt(data, 'utf8');

        return decrypted
    },
    // web端解密
    webDecrypt(data) {
        const key = new NodeRSA({ b: 512 }, { encryptionScheme: 'pkcs1' });
        const privateKey = fs.readFileSync('privateKey.txt', 'utf-8');
        key.importKey(privateKey);
        const decrypted = key.decrypt(data, 'utf8');

        return decrypted
    },
    // 验证码配置
    svgCaptcha: {
        // 字体大小
        fontSize: 36,
        // 噪声线条数
        noise: 2,
        // 宽度
        width: 80,
        // 高度
        height: 30,
        background: '#abc88b',
    },
    // OSS配置
    OSSConfig: {
        region: 'oss-cn-shanghai',
        secure: true, // https
        accessKeyId: 'LTAI4G1swqzu68wErTCByoSd',
        accessKeySecret: 'bxW2ajCIKyD0klVndMJS5TC6DM9kgX',
        bucket: global.env === 'dev' ? 'yxz-blogs-test' : 'yxz-blogs'
    }
};

module.exports = config
