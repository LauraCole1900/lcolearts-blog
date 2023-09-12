const config = {
    overwrite: true,
    schema: "./schemas/typeDefs.gql",
    documents: [
        "../client/src/utils/gql/mutations.ts",
        "../client/src/utils.gql.queries.ts",
    ],
    generates: {
        "./tsdefs.ts": {
            plugins: ["typescript", "typescript-resolvers"],
            config: {
                useIndexSignature: true
            }
        },
        "./graphql.schema.json": {
            plugins: ["introspection"],
        },
    },
};
export default config;
