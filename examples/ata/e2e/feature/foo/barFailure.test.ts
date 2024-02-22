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


test(
  `Test title`,
  {
    // eslint-disable-next-line plentific/ata-required-tags
    tags: ['feature', 'foo', 'high'],
  },
  async () => {
    // ...
  },
)
