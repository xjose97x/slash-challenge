import { createTestCases } from '../helpers/createTestCases';
import { CartSchema } from '../schemas/cart';

export default createTestCases([
  {
    name: 'Validate empty card with missing optional properties',
    schema: CartSchema,
    matchesSchema: true,
    data: {
      items: [],
    },
  },
  {
    name: 'Validate empty card with optional properties',
    schema: CartSchema,
    matchesSchema: true,
    data: {
      items: [],
      discounts: [],
    },
  },
  {
    name: 'Validate cart',
    schema: CartSchema,
    matchesSchema: true,
    data: {
      items: [
        {
          id: '001',
          cost: 10,
          size: 'xs',
          color: 'red',
        },
        {
          id: '002',
          cost: 100,
          size: 's',
          color: 'green',
        },
      ],
    },
  },
]);
