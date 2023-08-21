const mockMappingConfig = [
  {
    supplier: 'supplier1',
    rules: [
      { gatewayName: 'PROFILE', transformedName: 'UPSTREAM', transformValue: ['multiply', 10] },
      { gatewayName: 'PROFILE', transformedName: 'DOWNSTREAM', transformValue: ['multiply', 100] }
    ]
  },
  {
    supplier: 'supplier2',
    rules: [
      { gatewayName: 'PROF2', transformedName: 'SOMETHINGELSE', transformValue: ['multiply', 5] }
    ]
  },
  {
    supplier: 'supplier3',
    rules: [
      { gatewayName: 'PROF3', transformedName: 'SUPP3NAME' }
    ]
  },
  {
    supplier: 'supplier4',
    rules: [
      { transformValue: ['add', 2] }
    ]
  },
  {
    supplier: 'supplier5',
    rules: []
  }
];

jest.mock('../src/mappingConfigManager.ts', () => ({
  getMappingConfigs: jest.fn(() => {
    return mockMappingConfig
  }),
}));