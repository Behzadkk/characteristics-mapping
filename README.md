# Gateway Characteristics Mapper

## About

The Gateway Characteristics Mapper is a handy TypeScript library created to simplify the process of mapping and transforming characteristics between different suppliers' configurations. This README provides all the necessary information to get started and understand the library's features.

## Installation

Brfore starting please install dependencies using npm:

```bash
npm install
```

## Usage

```bash
import {
  mapGatewayCharacteristics,
  applyValueTransformation,
  reverseValueTransformation,
  SupplierMappingRule,
} from 'gateway-characteristics-mapper';

// Define your characteristics and supplier
const characteristics = [
  // ... (characteristics array)
];

const supplier = 'supplier1';

// Map characteristics based on the mapping configuration
const mappedCharacteristics = await mapGatewayCharacteristics(characteristics, supplier);

console.log(mappedCharacteristics);

// Apply and reverse value transformations
const transformedValue = applyValueTransformation('10', 'multiply', 2);
console.log(transformedValue);

const reversedValue = reverseValueTransformation('20', 'multiply', 2);
console.log(reversedValue);

// Define SupplierMappingRule
const rule: SupplierMappingRule = {
  // ... (rule properties)
};
```

## Configuration
You can configure the mapping directly in your code or load it from a database. The library provides utilities to simplify these operations. For detailed information, check the `mappingConfigManager.ts` file.

## API Reference

### mapGatewayCharacteristics

```bash
async function mapGatewayCharacteristics(
  characteristics: Characteristic[],
  supplier: string
): Promise<Characteristic[]>;
```

This function maps characteristics based on the mapping configuration for the specified supplier. The gateway characteristics mapper expects an array of gateway characteristics and returns an array of supplier characteristics.

### mapSupplierCharacteristics

```bash
async function mapSupplierCharacteristics(
  characteristics: Characteristic[],
  supplier: string
): Promise<Characteristic[]>;
```
This function inverse the characteristics based on the mapping configuration for the specified supplier. The supplier characteristics mapper expects an array of supplier characteristics and returns an array of gateway characteristics.


### applyValueTransformation
```bash
function applyValueTransformation(
  value: string,
  operation: string,
  operand: number
): string;
```
This function applies a value transformation operation to the given value.


### reverseValueTransformation
```bash
function reverseValueTransformation(
  value: string,
  operation: string,
  operand: number
): string;
```
This function reverses a value transformation operation applied to the given value.

### SupplierMappingRule
```bash
interface SupplierMappingRule {
  gatewayName?: string;
  transformedName?: string;
  transformValue?: [string, number];
}
```
This interface represents a mapping rule for transforming characteristics.

## Tests
To run the tests, execute:

```bash
npm run test
```



