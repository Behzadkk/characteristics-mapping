import { getMappingConfigs, SupplierMappingRule } from './mappingConfigManager';

interface Characteristic {
  name: string;
  value: string;
}

type CharacteristicsMapper = (
  characteristics: Characteristic[],
  supplier: string
) => Promise<Characteristic[]>;


export const applyValueTransformation = (value: string, operation: string, operand: number): string => {
  switch (operation) {
    case 'multiply':
      return (parseInt(value) * operand).toString()
    case 'add':
      return (parseInt(value) + operand).toString()
    case 'divide':
      return (parseInt(value) / operand).toString()
    case 'subtract':
      return (parseInt(value) - operand).toString()
    default:
      return value
  }
}

export const reverseValueTransformation = (value: string, operation: string, operand: number): string => {
  switch (operation) {
    case 'multiply':
      return (parseInt(value) / operand).toString()
    case 'add':
      return (parseInt(value) - operand).toString()
    case 'divide':
      return (parseInt(value) * operand).toString()
    case 'subtract':
      return (parseInt(value) + operand).toString()
    default:
      return value
  }
}

export const mapGatewayCharacteristics: CharacteristicsMapper = async (characteristics, supplier) => {
  // supplier rules can be loaded from a database
  const mappingConfigs = getMappingConfigs()
  const supplierConfig = mappingConfigs.find(config => config.supplier === supplier)
  const supplierRules: SupplierMappingRule[] = supplierConfig?.rules || []
 
  const mappedCharacteristics: Characteristic[] = [];
  for (const characteristic of characteristics) {
    const matchingRules = supplierRules.filter(rule => {
      if (rule.gatewayName) return rule.gatewayName === characteristic.name
      return rule
    })
    let name = characteristic.name
    let value = characteristic.value
    
    if (matchingRules.length > 0) {
      const transformedCharacteristics: Characteristic[] = matchingRules.map(rule => {
        if (rule.transformedName) {
          name = rule.transformedName
        }
        if (rule.transformValue) {
          const [operation, operand] = rule.transformValue;
          value = applyValueTransformation(characteristic.value, operation, operand)
        }
        return { name, value }
      })
      mappedCharacteristics.push(...transformedCharacteristics)
    } else {
      mappedCharacteristics.push({ name, value })     
    }
  }
  return mappedCharacteristics
};

export const mapSupplierCharacteristics: CharacteristicsMapper = async (characteristics, supplier) => {
  const mappingConfigs = getMappingConfigs()
  const supplierConfig = mappingConfigs.find(config => config.supplier === supplier)
  const supplierRules: SupplierMappingRule[] = supplierConfig?.rules || []

  const mappedCharacteristics: Characteristic[] = [];
  for (const characteristic of characteristics) {
    const matchingRules = supplierRules.filter(rule => {
      if (rule.transformedName) return rule.transformedName === characteristic.name
      return rule
    })
    let name = characteristic.name
    let value = characteristic.value

    if (matchingRules.length > 0) {
      const transformedCharacteristics: Characteristic[] = matchingRules.map(rule => {
        if (rule.gatewayName) {
          name = rule.gatewayName
        }
        if (rule.transformValue) {
          const [operation, operand] = rule.transformValue;
          value = reverseValueTransformation(characteristic.value, operation, operand)
        }
        return { name, value }
      })
      mappedCharacteristics.push(...transformedCharacteristics)
    } else {
      mappedCharacteristics.push({ name, value })
    }
  }
  return mappedCharacteristics
  
};