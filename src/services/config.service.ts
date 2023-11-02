import { Configuration } from '@/generated-api/runtime';
import type { ConfigurationParameters } from '@/generated-api/runtime';
import useTokenStore from '@/store/tokenStore';

export default class ConfigurationService {
  static getConfiguration(): Configuration {
    const provider = useTokenStore();
    const confParam: ConfigurationParameters = {
      accessToken: `Bearer ${provider.token}`,
    };
    return new Configuration(confParam);
  }
}
