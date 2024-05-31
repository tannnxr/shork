/**
 * Generic error if there is not a custom error.  Extends from node:Error.
 */
export class ShorkError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "Shork Error"
		Error.captureStackTrace(this, ShorkError)
	}
}

/**
 * Used if the token is invalid.
 * Args:
 * message (string) -> The error message to send.
 */
export class InvalidTokenError extends ShorkError {
	constructor(message: string) {
		super(message)
		this.name = "ShorkInvalidToken"
	}
}

/**
 * Use if an event fails to register.
 * Args:
 * message (string) -> The error message to send.
 */
export class EventRegistrationError extends ShorkError {
	constructor(message: string) {
		super(message)
		this.name = "EventRegistrationError"
	}
}