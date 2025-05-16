
import { faker } from "@faker-js/faker";
export default (user,count,userIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
userId: userIdIds[i % userIdIds.length],
message: faker.datatype.boolean(""),
type: faker.datatype.boolean("8"),
status: faker.datatype.boolean(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
