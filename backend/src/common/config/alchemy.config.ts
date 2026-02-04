import { Configuration, Value } from '@itgorillaz/configify';

@Configuration()
export class AlchemyConfig {
  @Value('ALCHEMY_API_KEY', { default: '123456' })
  alchemyApiKey: string;
}
