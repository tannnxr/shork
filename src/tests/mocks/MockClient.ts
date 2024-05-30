import { ClientOptions, REST } from "discord.js";

/**
 * A mock client used for testing, derived from the official Client class from discord.js
 * @extends {null}
 */
class MockClient {
    rest: REST;
    constructor(options: ClientOptions) {
        // Rest manager of the MockClient
        this.rest = new REST()
    }
}

export {MockClient}