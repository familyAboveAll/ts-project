export default class util {
    static getUrlPrem(key: string, url?: string) {
        const search = url || window.location.href;
        const pattern = new RegExp(`[?&]${key}=([^&]+|\\w+)`, 'g');
        const matcher = pattern.exec(search);
        let items = null;
        if (matcher !== null) {
            try {
                items = decodeURIComponent(decodeURIComponent(matcher[1]));
            } catch (e) {
                try {
                    items = decodeURIComponent(matcher[1]);
                } catch (err) {
                    items = matcher[1];
                }
            }
        }
        return items;
    }
}