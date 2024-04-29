import {
    Canister,
    float32,
    Principal,
    query,
    Record,
    StableBTreeMap,
    text,
    Vec
} from 'azle';
import { v4 as uuidv4 } from 'uuid';

const Tutor = Record({
    id: Principal,
    name: text,
    category: text,
    subject: text,
    cost: float32,
    phone: text
});

type Tutor = typeof Tutor.tsType;

/*
const AplicationError = Variant({
    TutorDoesNotExist: text
});

type AplicationError = typeof AplicationError.tsType;
*/

let tutors = StableBTreeMap<Principal, Tutor>(0);

if (tutors.isEmpty()) {
    const id = generateId();
    const tutor: Tutor = {
        id: id,
        name: 'Elena Nito del Bosque',
        category: 'dancing',
        subject: 'Rumba',
        cost: 8.5,
        phone: '12345'
    };

    tutors.insert(tutor.id, tutor);
}

export default Canister({
    greet: query([text], text, (name) => {
        return `Hello, ${name}!`;
    }),
    index: query([], Vec(Tutor), () => {
        return tutors.values();
    })
})

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
    //const randomText = uuidv4();
    //return Principal.fromText(randomText);
}
