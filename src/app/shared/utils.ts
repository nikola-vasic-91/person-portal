export default class Utils {
    static formatUrl(url: string | undefined) {
        return url && url.indexOf('://') === -1 ? 'https://' + url : url;
    }
}