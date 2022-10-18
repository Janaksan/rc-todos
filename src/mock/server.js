import { createServer, Model } from "miragejs"

export function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        models: {

            todos: Model,
            users: Model,
        },
        seeds(server) {
            server.db.loadData({
                users: [
                    { id: 1, name: "Interstellar" },
                    { id: 2, name: "Inception" },
                    { id: 3, name: "Dunkirk" },
                ],
                todos: [
                    { id: 1, name: "T1" },
                    { id: 2, name: "T2" },
                    { id: 3, name: "T3" },
                ],
            })
        },
        routes() {
            this.namespace = "api";

            this.get("/users", (schema) => {
                return schema.users.all();
            })

            this.post("/user", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
                return schema.users.insert(attrs)
            })

            this.get("/user/:id", (schema, request) => {
                let id = request.params.id

                return schema.users.find(id) // users in the second case
            })

            this.patch("/user/:id", function (schema, request) {
                let id = request.params.id
                let attrs = this.normalizedRequestAttrs()

                return schema.users.find(id).update(attrs)
            })


            this.del("/user/:id", (schema, request) => {
                let id = request.params.id

                schema.users.find(id).destroy()
            })


            //todo

            this.get("/todos", (schema) => {
                return schema.todos.all();
            })

        },
    })
}