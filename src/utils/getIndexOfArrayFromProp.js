/** 参数arr 必须传入
 *  参数key 必须传入
 *  参数val 必须传入
 *  return 返回该数组符合{key: val}条件的index，如果没有则返回-1
 * */
export default function getIndexOfArrayFromProp (arr, key, val) {
    for (let i = 0; i < arr.length; i++) {
        if ((arr[i][key]).toString() === val.toString()) {
            return i
        }
    }
    return -1
}
