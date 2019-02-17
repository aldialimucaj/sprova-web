import { Entity } from './entity';

export /**
 * User
 */
class User extends Entity {
    _id: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    status: string;
    admin: boolean;
}
