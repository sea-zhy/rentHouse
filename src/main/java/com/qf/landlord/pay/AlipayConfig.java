package com.qf.landlord.pay;

import java.io.FileWriter;
import java.io.IOException;

public class AlipayConfig {
    // 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
    public static String app_id = "2016100100641836";

    // 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChAg/fUt3P8lcLmLt/QRfGmzp3sWlzhFvD29xd/GBYgf1qe2DFdJIJbpUtMnJP1VFwTgY69Kyz0QvTDb1/PPAIcuE3NtbyhfKleEYfldkDwzkc1WZ+EOUU8v60yHd35PmcvNDD3gCyZdUCAjDmhSZIEA2VZ7ffidWyr84gXJC4YEWTlJD2KA/pqUyPNOQqCPylrbhIqM6gWtTCRDi0uxthJHLuRRg/N+6jLfIynReYr0Qeq89AUQtvwsOqV267hZWZFuMR2KuarzbsnpDQv0HKySHU5JNGzOsdbb87SkIORuDzRnnFv9Nn+MACTfOZNrqCq2P7EWdaL0qDpevuG6/VAgMBAAECggEAEw/abzcxWaA4XAAeGqfLN9FC787KTEncT2jlQx9RDMl/Bi9LOrVdYM59zNcPH5KCzMgABtTW6YcTXk5fJARD6swnC9FrS1U+cAa4Tp8ADWj8hwRg2QYJCRznuOGO+1vZjYvxL29GJ9jUiiNWRMR4zslPwmOAKm/4I+qafcxXuexCpZHWEcqAn2QjYK009r55seZZgIcMIRB2yLnbP94XaYamOlNjbylrXqliFPlTrqdOfvmMGLZ3nWn7getJezcIlvxqNinsRRue7i2reh0Uz3PVCjC8c5XWS/uaM+Tdp8bVuFJVjeMziQWRSX0mN/7LkEcLZrfyJ8krCVaNWQAdNQKBgQD+M2RIZL/NwMZnmwid9Pvj+cpAzbJHsGaYW5OONo78M1/XQ0rpX9vRKrkpZmQD3D2KrM+c5GfeQqsY1e5yVCtoI6esYHu2bv9ty1H4Jnr+tB4JUhnN639zdkzBv13uwmQPXsCQ7Mh5pGRJEhzGV2Tk4yRXsiHZqWewr1ovmsxZAwKBgQCiJc5vcnkazSvJHO8l+Ujd7go4qfYTljlUi+LZv9GtGS2BAnT2I0Qk28avDPoBB3kLSx+zMRleq8T8sOHlQiauM1B9YTdlcrF3k19ZKK5XELVOwJBqnNof3KX7jdYrFq8AdZsg9oD8x5oQOetOJbVXnex7YiG1W615vhJNtiUARwKBgFD78HP73Ptg8hSp2KnyFZnAx8WzgpvCQD1D15OUICOK/nqnDqOhDXfq44ij/TMZpGWcvpveTJULqlTEOy4jUJzh1xZcuq0ZWbkR8HBdWgvxOCyCAoSPBVC0nKmRHQzm01fuOO0y8n+Gdwisg4xQ5WziTH6/2nbsuIMaqmHGMFofAoGATR+2ZQQJ3lmgbfQ5O9KqegTzD6inxwE5G6G9sNywGqlTH33PrBNyIiX3BuQhNcQcKub8mPrNml4RQC/SAn3IcCswKbLH6pT3HG0YeQwEgJ0N3/tvtYYNqgIFYPVB3RTZAFrwAmm9SH6YJQeniHAfJSGUjctLRTvp83IYuqXcS5kCgYEA5InuuojnFQUuCj9iSH6Wg+WVOnODUyRWFMh0wT/TrnVgEmPx/mzZhIyBav3mIEh9RwJgWMZqBEdciPLXnU082HaPkN/eFxqFK5RwE2AFlkHDueG3hbQHvQ/i76AzIPmIw/K3H8Ac6lhy32xLkFyi6NUU9lJcwjyVFUKpyPr2BPU=";
    // 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKG3jH+t9TNg8MIyZQm/iym3XfYGPRBTpIgJvxZs7qwl3r0Asc4gHk7CLNi4RsfoL3agONTibVkLte3gO+/hu98SpZMG+FymuSwy21ImD7F5z/iAMUhcNjhQFhMYZZ4DzWg0RlhrNchuW6P/mszlajfNLlxoQVjzYEEyq6M63epygRrczYAgkWwFLym0+alkLxumYcPi4sce2RQ1DiNGxJQtwFQgkRIKcbgyP3uDVrwKqGQ5pjPwvO/8YV0mzTLkqRgNxPOvDDOReU8cQW7Yqh0rVDTiYZocLfMDQI7WC9ljLutNwzPyyOJi2VHhsOEJwKE5ZWTpEz3UtQoteSYBowIDAQAB";
    // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String notify_url = "http://localhost:8080/notify_url.jsp";

    // 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String return_url = "http://localhost:8080/payResult/return_url";

    // 签名方式
    public static String sign_type = "RSA2";

    // 字符编码格式
    public static String charset = "utf-8";

    // 支付宝网关 //
    //public static String gatewayUrl = "https://openapi.alipay.com/gateway.do";// 正式
    public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";// 测试

    // 支付宝网关 日志
    public static String log_path = "C:\\";

//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    /**
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

}
