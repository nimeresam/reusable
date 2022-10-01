export class AutocompleteOption {
    key!: string;
    value: any;
    entire: Object | string | any;

    constructor(option: any, keyProp: string = "", valueProp: string = "") {
        switch(typeof option) {
            case 'bigint':
            case 'number':
            case 'string':
            case 'boolean':
                this.key = option.toString();
                this.value = option;
                break;
            case 'object':
                this.key = extractObjectValue(option, keyProp);
                this.value = extractObjectValue(option, valueProp);
                this.entire = option;
                break
            default:
                throw new Error('Failed to parse option');
        }
    }
}

function extractObjectValue(object: any, key: string): string {
    return key?.split('.').reduce(
        (acc, key: string) => acc?.hasOwnProperty(key)? acc[key]: '',
        object
    ) as string;
}