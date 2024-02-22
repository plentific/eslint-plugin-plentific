import { test, seed } from '../../../Test'

seed(
  'Seed title',
  {
    tags: ['feature', 'foo'],

  },
  async () => {
    // ...
  },
)


test(
  'Test title',
  {
    tags: ['feature', 'foo', 'e2e', 'highest'],
  },
  async () => {
    // ...
  },
)
