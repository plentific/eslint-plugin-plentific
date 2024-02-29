import { test, seed } from '../../../Test'

seed(
  `Seed title`,
  {
    tags: ['feature', 'foo', 'high'],
  },
  async () => {
    // ...
  },
)

const someValue = 'some value'

test(
  `Test ${someValue} title`,
  {
    // eslint-disable-next-line plentific/ata-required-test-attributes
    tags: ['feature', 'foo', 'high'],
    // eslint-disable-next-line plentific/ata-required-test-attributes
    tcrIds: [],
  },
  async () => {
    // ...
  },
)


test(
  `Test ${someValue} with two tags from the same category, but only one must be present`,
  {
    // eslint-disable-next-line plentific/ata-required-test-attributes
    tags: ['feature', 'multi-a', 'foo', 'e2e', 'high', 'low'],
    // eslint-disable-next-line plentific/ata-required-test-attributes
    tcrIds: [],
  },
  async () => {
    // ...
  },
)

