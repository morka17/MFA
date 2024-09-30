import { makeExecutableSchema } from "@graphql-tools/schema";
import AuthTypeDefs from "../features/authentications/email_based/email.schema";





const typeDefs: any[] = [AuthTypeDefs]
const resolvers: any[] = []


let schema = makeExecutableSchema({ typeDefs, resolvers })

// // Auth directive transformation 
// schema = authDirectiveTransformer(schema, 'auth');

export default schema