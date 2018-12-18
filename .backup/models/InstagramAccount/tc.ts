import { composeWithMongoose } from 'graphql-compose-mongoose';

import makeFields from './fields';
import model from './model'

const TC = makeFields(composeWithMongoose(model, {}))
export default TC;