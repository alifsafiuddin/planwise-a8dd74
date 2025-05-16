
import { faker } from "@faker-js/faker";
export default (user,count,userIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
adviceId: faker.lorem.sentence(""),
userId: userIdIds[i % userIdIds.length],
adviceSummary: faker.lorem.sentence(""),
investmentTips: faker.lorem.sentence(""),
budgetTips: faker.lorem.sentence(""),
aiModelVersion: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
