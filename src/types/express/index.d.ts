// to make the file a module and avoid the TypeScript error
// eslint-disable-next-line prettier/prettier
export { };

declare global {
	namespace Express {
		export interface Request {
			userId: number;
		}
	}
}
