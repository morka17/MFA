import { makeExecutableSchema } from "@graphql-tools/schema";





const typeDefs: any[] = []
const resolvers: any[] = []


let schema = makeExecutableSchema({ typeDefs, resolvers })

// // Auth directive transformation 
// schema = authDirectiveTransformer(schema, 'auth');

export default schema