import { mapGatewayCharacteristics } from './characteristicsMapper';



// example use
const characteristics = [
  { name: 'PROFILE', value: '10' },
  {name: 'NOTMAPPED', value: '20' }
]

const supplierName = 'supplier1'

// Expected to return
  // [
  //   { name: 'UPSTREAM', value: '100' },      // there is a rule for name PROFILE
  //   { name: 'DOWNSTREAM', value: '1000' },   // there is another rule for name PROFILE
  //   { name: 'NOTMAPPED', value: '20' }       // there are no rules for NOTMAPPED on supplier 1
  // ]
mapGatewayCharacteristics(characteristics, supplierName)
  .then(mappedCharacteristics => {
    console.log(mappedCharacteristics);
  })
  .catch(error => {
    console.error('Error:', error);
  });