/**
 * 把tokenPayload解析成json
 * @param token
 * token示例：
 * eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW5kZXIiOiIwIiwibmFtZSI6IjEzMzMzMzMzMzMzIiwiaWQiOiI1IiwiZXhwIjoxNzI5NDE2MjE1LCJhZ2UiOiIwIn0.nr5GpN2r8TpCu90lW6RbwjvEc955QacvK_pvc9RA4mE
 */
export function parseTokenPayload(token){

    var strings = token.split("."); //截取token，获取载体（分三段）

    var userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))));

    return userinfo;
}

/**
 * 如果token未超期，则返回json对象，否则返回null
 * @param 返回解析后的json对象
 */
export function parseTokenPayloadValid(token){

    var userJson = parseTokenPayload(token);

    var expTime = userJson.exp;//以秒为单位,以世界标准时区为时区

    var nowTime = new Date().getTime() / 1000;//当前时间换算成秒,以世界标准时区为时区

    return nowTime > expTime ? null : userJson;
}

//alert(JSON.stringify(parseTokenPayload("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW5kZXIiOiIwIiwibmFtZSI6IjEzMzMzMzMzMzMzIiwiaWQiOiI1IiwiZXhwIjoxNzI5NDE2MjE1LCJhZ2UiOiIwIn0.nr5GpN2r8TpCu90lW6RbwjvEc955QacvK_pvc9RA4mE")));

