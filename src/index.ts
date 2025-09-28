import { type } from 'arktype';
import { Hono } from 'hono'
import { openAPIRouteHandler, describeRoute, resolver } from 'hono-openapi';

const app = new Hono()

export const exampleSchema = type({
  example: 'string | undefined'
});


export const exampleRoute = describeRoute({
	operationId: "",
	responses: {
		200: {
			description: "An example response",
			content: {
				"application/json": {
					schema: resolver(exampleSchema),
				},
			},
		},
	},
});


app.post('/', exampleRoute, (c) => {
  return c.text('Hello Hono!')
})

app.get('/openapi.json', openAPIRouteHandler(app, {
	  documentation: {
			info: {
				title: "Ironmount API",
				version: "1.0.0",
				description: "API for managing volumes",
			},
			servers: [{ url: "http://localhost:4096", description: "Development Server" }],
		},
	}))

export default app
