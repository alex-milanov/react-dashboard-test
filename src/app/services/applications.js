
import { faker } from '@faker-js/faker'; 


const generate = () => ({
  id: faker.string.uuid(),
  created: faker.date.between({from: '2020-01-01', to: new Date()}),
  user: {
    fullName: faker.person.fullName(),
    email: faker.internet.email()
  },
  type: faker.helpers.arrayElement(['aiscan1', 'aiscan2', 'aiscan3', 'bob']),
  riskScore: faker.helpers.arrayElement([null, 'low', 'medium', 'high']),
  status: faker.helpers.arrayElement(['approved', 'rejected', 'cancelled', 'readyForReview', 'inProgress']),
})

export const list = () => faker.helpers.multiple(generate, {count: {min: 15, max: 60}});
