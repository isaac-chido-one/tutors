import {
    Canister,
    float32,
    nat32,
    Principal,
    query,
    Record,
    StableBTreeMap,
    text,
    update,
    Vec
} from 'azle';

const Tutor = Record({
    id: Principal,
    name: text,
    category: nat32,
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

export default Canister({
    greet: query([text], text, (name) => {
        return `Hello, ${name}!`;
    }),

    create: update([text, nat32, text, float32, text], Tutor, (name, category, subject, cost, phone) => {
        const id = generateId();
        const tutor: Tutor = {
            id: id,
            name: name,
            category: category,
            subject: subject,
            cost: cost,
            phone: phone
        };

        tutors.insert(tutor.id, tutor);

        return tutor;
    }),

    destroy: update([text], text, (id) => {
        const tutorOpt = tutors.get(Principal.fromText(id));

        if ('None' in tutorOpt) {
            return 'error';
        }

        const tutor = tutorOpt.Some;
        tutors.remove(tutor.id);

        return 'success';
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
}
