import { faker } from '@faker-js/faker'
import { User } from './interfaces'

export const testUser: User = {
  email: faker.internet.email(),
  password: faker.helpers.fromRegExp('[a-zA-Z0-9]{5}[A-Z]{1}[0-9]{1}[!@#$%^&*]{1}'),
  phone: Cypress.env('phone'),
}
