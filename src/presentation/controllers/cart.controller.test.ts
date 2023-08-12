import request from "supertest";

import { app, server } from "../..";
import { envs } from "../../config/env.factory";

describe("tests cart/ resource", () => {
	beforeAll(() => {
		process.env.ENV = "test";
	});

	afterAll(() => {
		server.close();
	});

	describe("POST /cart", () => {
		beforeEach(() => {
			jest.resetModules();
		});

		it("responds 204 [valid request]", done => {
			request(app)
				.post("/cart")
				.send({
					itemId: 1,
					amount: 4,
				})
				.set("authorization", envs.userToken)
				.expect(204)
				.end(done);
		});

		it("responds 400 [invalid body]", done => {
			request(app)
				.post("/cart")
				.send({ amount: 4 })
				.set("authorization", envs.userToken)
				.expect(400)
				.end(done);
		});

		it("responds 400 [domain error]", done => {
			request(app)
				.post("/cart")
				.send({ item: 1, amount: -4 })
				.set("authorization", envs.userToken)
				.expect(400)
				.end(done);
		});

		it("responds 404 [item not found]", done => {
			request(app)
				.post("/cart")
				.send({ itemId: 999999, amount: 4 })
				.set("authorization", envs.userToken)
				.expect(404)
				.end(done);
		});

		it("responds 401 [authorization header not found]", done => {
			request(app).post("/cart").send({ itemId: 1, amount: 4 }).expect(401).end(done);
		});

		it("responds 401 [invalid token]", done => {
			request(app)
				.post("/cart")
				.send({ itemId: 1, amount: 4 })
				.set("authorization", "badauthorization")
				.expect(401)
				.end(done);
		});
	});

	describe("DELETE /cart/item/:id", () => {
		beforeEach(() => {
			jest.resetModules();
		});
		it("responds 404 [cart not found]", done => {
			request(app)
				.delete("/cart/item/2")
				.send()
				.set("authorization", envs.userToken)
				.expect(404)
				.end(done);
		});
		it("responds 204 [valid request]", done => {
			request(app)
				.post("/cart")
				.send({ itemId: 1, amount: 4 })
				.set("authorization", envs.userToken)
				.end(() => {
					request(app)
						.delete("/cart/item/1")
						.send()
						.set("authorization", envs.userToken)
						.expect(204)
						.end(done);
				});
		});

		it("responds 404 [item not found]", done => {
			request(app)
				.delete("/cart/item/9999999")
				.send()
				.set("authorization", envs.userToken)
				.expect(404)
				.end(done);
		});

		it("responds 401 [authorization header not found]", done => {
			request(app).delete("/cart/item/1").send().expect(401).end(done);
		});

		it("responds 401 [invalid token]", done => {
			request(app)
				.delete("/cart/item/1")
				.send()
				.set("authorization", "invalidToken")
				.expect(401)
				.end(done);
		});
	});

	describe("get /cart", () => {
		beforeEach(() => {
			jest.resetModules();
		});
		/**
		 * In a more elaborated test it would be good to reset testing database after each test
		 * using sqlite, for example
		 */
		// it("responds 404 [cart not found]", done => {
		// 	request(app).get("/cart").send().set("authorization", envs.userToken).expect(404).end(done);
		// });

		it("responds 200 [cart found]", () => {
			request(app)
				.post("/cart")
				.send({ itemId: 1, amount: 3 })
				.set("authorization", envs.userToken)
				.end(() => {
					request(app)
						.get("/cart")
						.send()
						.set("authorization", envs.userToken)
						.expect(200)
						.then(response => {
							expect(response.body).toStrictEqual({
								items: [
									{
										item: {
											id: 1,
											name: "T-Shirt",
											price: 12.99,
										},
										amount: 3,
									},
								],
								totalPrice: 25.98,
							});
						});
				});
		});

		it("responds 401 [authorization header not found]", done => {
			request(app).get("/cart").send().expect(401).end(done);
		});

		it("responds 401 [invalid token]", done => {
			request(app).get("/cart").send().set("authorization", "invalidToken").expect(401).end(done);
		});
	});
});
