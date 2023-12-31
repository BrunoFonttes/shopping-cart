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
	describe("get /cart", () => {
		beforeEach(() => {
			jest.resetModules();
		});

		it("responds 200 [cart empty]", () => {
			request(app)
				.get("/api/v1/cart")
				.send()
				.set("authorization", envs.userToken)
				.expect(200)
				.then(response => {
					expect(response.body).toStrictEqual({
						items: [],
						discount: 0,
						discountPrice: 0,
						totalPrice: 0,
					});
				});
		});

		it("responds 200 [cart found]", () => {
			request(app)
				.post("/api/v1/cart")
				.send({ itemId: 1, amount: 3 })
				.set("authorization", envs.userToken)
				.end(() => {
					request(app)
						.get("/api/v1/cart")
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
								discount: 12.99,
								discountPrice: 25.98,
								totalPrice: 38.97,
							});
						});
				});
		});

		it("responds 401 [authorization header not found]", done => {
			request(app).get("/api/v1/cart").send().expect(401).end(done);
		});

		it("responds 401 [invalid token]", done => {
			request(app)
				.get("/api/v1/cart")
				.send()
				.set("authorization", "invalidToken")
				.expect(401)
				.end(done);
		});
	});

	describe("POST /cart", () => {
		beforeEach(() => {
			jest.resetModules();
		});

		it("responds 204 [valid request]", done => {
			request(app)
				.post("/api/v1/cart")
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
				.post("/api/v1/cart")
				.send({ amount: 4 })
				.set("authorization", envs.userToken)
				.expect(400)
				.end(done);
		});

		it("responds 400 [domain error]", done => {
			request(app)
				.post("/api/v1/cart")
				.send({ itemId: 1, amount: -4 })
				.set("authorization", envs.userToken)
				.expect(400)
				.end(done);
		});

		it("responds 404 [item not found]", done => {
			request(app)
				.post("/api/v1/cart")
				.send({ itemId: 999999, amount: 4 })
				.set("authorization", envs.userToken)
				.expect(404)
				.end(done);
		});

		it("responds 401 [authorization header not found]", done => {
			request(app).post("/api/v1/cart").send({ itemId: 1, amount: 4 }).expect(401).end(done);
		});

		it("responds 401 [invalid token]", done => {
			request(app)
				.post("/api/v1/cart")
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
				.delete("/api/v1/cart/item/2")
				.send()
				.set("authorization", envs.userToken)
				.expect(404)
				.end(done);
		});
		it("responds 204 [valid request]", done => {
			request(app)
				.post("/api/v1/cart")
				.send({ itemId: 1, amount: 4 })
				.set("authorization", envs.userToken)
				.end(() => {
					request(app)
						.delete("/api/v1/cart/item/1")
						.send()
						.set("authorization", envs.userToken)
						.expect(204)
						.end(done);
				});
		});

		it("responds 404 [item not found]", done => {
			request(app)
				.delete("/api/v1/cart/item/9999999")
				.send()
				.set("authorization", envs.userToken)
				.expect(404)
				.end(done);
		});

		it("responds 401 [authorization header not found]", done => {
			request(app).delete("/api/v1/cart/item/1").send().expect(401).end(done);
		});

		it("responds 401 [invalid token]", done => {
			request(app)
				.delete("/api/v1/cart/item/1")
				.send()
				.set("authorization", "invalidToken")
				.expect(401)
				.end(done);
		});
	});
});
