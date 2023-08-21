export interface SupplierMappingRule {
  gatewayName?: string;
  transformedName?: string,
  transformValue?: [string, number]
}

interface MappingConfig {
  supplier: string,
  rules: SupplierMappingRule[]
}

// Mapping configs can be written on database
// Here are some examples for different test scenaios.
// supplier 1 has 2 rules to change the vlaue and name
// supplier 2 has one rule to change the vlaue and name
// supplier 3 has one rule to only change the name
// supplier 4 has one rule to change the value
// supplier 5 does not have any rules

const mappingConfigs: MappingConfig[] = [
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
]

export const getMappingConfigs = (): MappingConfig[] => {
  return mappingConfigs
}

