
export default (val: any): val is object => typeof val === 'object' && !Array.isArray(val) && val !== null
