/**
 * 删除JSON中的空字段：0、0.0、""、[]、{}、false、undefined、null……
 * @param json
 */
export function removeEmptyProperties(json){
    let result = {};
    if(json){
        for(let key in json){
            let value = json[key];
            if(value){
                result [key] = value;
            }
        }
    }
    return result;
}