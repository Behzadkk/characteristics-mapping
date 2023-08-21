import {
  mapGatewayCharacteristics,
  mapSupplierCharacteristics,
  applyValueTransformation,
  reverseValueTransformation
} from '../src/characteristicsMapper';

describe('applyTransformation', () => {
  it('correctly applies transformations', () => {
    expect(applyValueTransformation("10", 'multiply', 2)).toBe("20");
    expect(applyValueTransformation("10", 'add', 5)).toBe("15");
    expect(applyValueTransformation("10", 'divide', 2)).toBe("5");
    expect(applyValueTransformation("10", 'subtract', 3)).toBe("7");
  });
});

describe('reverseTransformation', () => {
  it('correctly applies transformations', () => {
    expect(reverseValueTransformation("20", 'multiply', 2)).toBe("10");
    expect(reverseValueTransformation("15", 'add', 5)).toBe("10");
    expect(reverseValueTransformation("5", 'divide', 2)).toBe("10");
    expect(reverseValueTransformation("7", 'subtract', 3)).toBe("10");
  });
});

describe('mapGatewayCharacteristics', () => {
  it('transforms the name and returns the same value', async () => {
    const characteristics = [
      { name: 'PROF3', value: '10' },
    ];

    const mappedCharacteristics = await mapGatewayCharacteristics(characteristics, 'supplier3');

    expect(mappedCharacteristics).toEqual([
      { name: 'SUPP3NAME', value: '10' }
    ]);
  });

  it('transforms the value and returns the same name', async () => {
    const characteristics = [
      { name: 'PROF4', value: '10' },
    ];

    const mappedCharacteristics = await mapGatewayCharacteristics(characteristics, 'supplier4');

    expect(mappedCharacteristics).toEqual([
      { name: 'PROF4', value: '12' }
    ]);
  });

  it('maps characteristics based on two different rules', async () => {
    const characteristics = [
      { name: 'PROFILE', value: '10' },
    ];

    const mappedCharacteristics = await mapGatewayCharacteristics(characteristics, 'supplier1');

    expect(mappedCharacteristics).toEqual([
      { name: 'UPSTREAM', value: '100' },
      { name: "DOWNSTREAM", value: '1000' },
    ]);
  });

  it('changes the only acceptable characteristic and the other one stays as it is', async () => {
    const characteristics = [
      { name: 'PROFILE', value: '10' },
      { name: 'SOMETHINGELSE', value: '20' }
    ];

    const mappedCharacteristics = await mapGatewayCharacteristics(characteristics, 'supplier1');

    expect(mappedCharacteristics).toEqual([
      { name: 'UPSTREAM', value: '100' },
      { name: "DOWNSTREAM", value: '1000' },
      { name: 'SOMETHINGELSE', value: '20' }
    ]);
  });

  it('returns the same name and value pair if no rule is defined', async () => {
    const characteristics = [
      { name: 'PROFILE5', value: '10' },
    ];

    const mappedCharacteristics = await mapGatewayCharacteristics(characteristics, 'supplier5');

    expect(mappedCharacteristics).toEqual([
      { name: 'PROFILE5', value: '10' },
    ]);
  });
  
  it('returns the same name and value pair if supplier is not defined', async () => {
    const characteristics = [
      { name: 'PROFILE6', value: '10' },
    ];

    const mappedCharacteristics = await mapGatewayCharacteristics(characteristics, 'supplier6');

    expect(mappedCharacteristics).toEqual([
      { name: 'PROFILE6', value: '10' },
    ]);
  });
});

describe('mapSupplierCharacteristics', () => {
  it('transforms the name and returns the same value', async () => {
    const characteristics = [
      { name: 'SUPP3NAME', value: '10' }
    ];

    const mappedCharacteristics = await mapSupplierCharacteristics(characteristics, 'supplier3');

    expect(mappedCharacteristics).toEqual([
      { name: 'PROF3', value: '10' }
    ]);
  });

  it('transforms the value and returns the same name', async () => {
    const characteristics = [
      { name: 'PROF4', value: '12' }
    ];

    const mappedCharacteristics = await mapSupplierCharacteristics(characteristics, 'supplier4');

    expect(mappedCharacteristics).toEqual([
      { name: 'PROF4', value: '10' }
    ]);
  });

  it('maps characteristics based on two different rules', async () => {
    const characteristics = [
      { name: 'UPSTREAM', value: '100' },
      { name: "DOWNSTREAM", value: '1000' }
    ];

    const mappedCharacteristics = await mapSupplierCharacteristics(characteristics, 'supplier1');

    expect(mappedCharacteristics).toEqual([
    // if this is not expected behaviour, we can change the code to return a single object
    // [{ name: 'PROFILE', value: '10' }] 
      { name: 'PROFILE', value: '10' },
      { name: 'PROFILE', value: '10' }
    ]);
  });

  it('changes the only acceptable characteristic and the other one stays as it is', async () => {
    const characteristics = [
      { name: 'UPSTREAM', value: '100' },
      { name: "DOWNSTREAM", value: '1000' },
      { name: 'SOMETHINGELSE', value: '20' }
      
    ];

    const mappedCharacteristics = await mapSupplierCharacteristics(characteristics, 'supplier1');

    expect(mappedCharacteristics).toEqual([
      { name: 'PROFILE', value: '10' },
      { name: 'PROFILE', value: '10' },
      { name: 'SOMETHINGELSE', value: '20' }
    ]);
  });

  it('returns the same name and value pair if no rule is defined', async () => {
    const characteristics = [
      { name: 'PROFILE5', value: '10' },
    ];

    const mappedCharacteristics = await mapSupplierCharacteristics(characteristics, 'supplier5');

    expect(mappedCharacteristics).toEqual([
      { name: 'PROFILE5', value: '10' },
    ]);
  });

  it('returns the same name and value pair if supplier is not defined', async () => {
    const characteristics = [
      { name: 'PROFILE6', value: '10' },
    ];

    const mappedCharacteristics = await mapSupplierCharacteristics(characteristics, 'supplier6');

    expect(mappedCharacteristics).toEqual([
      { name: 'PROFILE6', value: '10' },
    ]);
  });
});