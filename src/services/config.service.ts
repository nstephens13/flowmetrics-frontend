import {
    Configuration,
    ConfigurationParameters,
    createConfiguration,
} from "@/generated-api/configuration";
import { JwtProvider } from "@/services/jwt.service";

export class ConfigurationService {
    getConfiguration(): Configuration {
        const provider = new JwtProvider();
        const conf: ConfigurationParameters = {
            authMethods: {
                bearer: {
                    tokenProvider: provider,
                },
            },
        };
        return createConfiguration(conf);
    }
}
