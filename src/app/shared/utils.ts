export default class Utils {
    static formatUrl(url: string | undefined) {
        console.log(url);
        return url && url.indexOf('://') === -1 ? 'https://' + url : url;
    }
}