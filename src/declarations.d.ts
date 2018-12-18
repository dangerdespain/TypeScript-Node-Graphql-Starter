declare module '@saeris/graphql-scalars';
declare module 'node-fetch';
declare module "*.graphql" {
  const value: any;
  export default value;
}