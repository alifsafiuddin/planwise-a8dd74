
import { faker } from "@faker-js/faker";
export default (user,count,userIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
userId: userIdIds[i % userIdIds.length],
source: faker.date.past(""),
amount: faker.date.past(""),
dateReceived: faker.date.past(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
