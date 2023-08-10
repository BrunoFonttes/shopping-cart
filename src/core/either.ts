/* eslint-disable no-mixed-spaces-and-tabs */
export type Either<L, A> = ErrorResult<L, A> | SuccessResult<L, A>;

export class ErrorResult<L, A> {
	readonly value: L;

	constructor(value: L) {
		this.value = value;
	}

	isError(): this is ErrorResult<L, A> {
		return true;
	}

	isSuccess(): this is SuccessResult<L, A> {
		return false;
	}
}

export class SuccessResult<L, A> {
	readonly value: A;

	constructor(value: A) {
		this.value = value;
	}

	isError(): this is ErrorResult<L, A> {
		return false;
	}

	isSuccess(): this is SuccessResult<L, A> {
		return true;
	}
}

export const error = <L, A>(l: L): Either<L, A> => {
	return new ErrorResult<L, A>(l);
};

export const success = <L, A>(a: A): Either<L, A> => {
	return new SuccessResult<L, A>(a);
};
