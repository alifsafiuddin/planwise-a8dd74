
import { faker } from "@faker-js/faker";
export default (user,count,userIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
userId: userIdIds[i % userIdIds.length],
debtName: faker.date.past(""),
amountDue: faker.date.past(""),
interestRate: faker.date.past(""),
dueDate: faker.date.past(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
