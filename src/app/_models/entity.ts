export class Entity {
    updateValues(obj) {
        // this could be to aggresive, but also allows no undefined members.
        let objKeys = Object.getOwnPropertyNames(this);
        for (let name of objKeys) {
            this[name] = obj[name];
        }
    }
}